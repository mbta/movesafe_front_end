import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import { create } from "zustand";
import useMsalLogin from "./msal/useMsal";

interface IAuthStore {
  isLoading: boolean;
  keyCloakInstance: Keycloak | null;
  isAuthenticated: boolean;
  authToken: string | null;
  userGroups: string[];
  username: string | null;
  setIsLoading(isLoading: boolean): void;
  login: (shouldRedirect: boolean) => void;
  loginWithEntraId: (interactive: boolean) => Promise<boolean>;
  logout: () => void;
}

interface IDbUser {
  username: string;
  groups: string[];
}

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_ADDRESS ?? "",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
};

export const AUTH_PROVIDER_KEY = "auth_provider";
export const AUTH_PROVIDER_ENTRA = "entra";

const getDbUser = async (token: string): Promise<IDbUser> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch user data from API");
  }

  const data = await response.json();
  return { username: data.username, groups: data.groups };
};

const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: true,
  keyCloakInstance: null,
  isAuthenticated: false,
  authToken: null,
  username: null,
  userGroups: [],
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  login: async (shouldRedirect: boolean) => {
    let initOptions: KeycloakInitOptions = {
      onLoad: "login-required",
      checkLoginIframe: false,
    };

    if (shouldRedirect) {
      initOptions = {
        ...initOptions,
        redirectUri: `${window.location.origin}/location-selection`,
      };
    }

    const keyCloak = new Keycloak(keycloakConfig);
    keyCloak
      .init(initOptions)
      .then((auth) => {
        set(() => ({
          isAuthenticated: auth,
          userGroups: keyCloak.tokenParsed?.groups || [],
          authToken: keyCloak.token || null,
          isLoading: false,
          username: keyCloak.tokenParsed?.preferred_username || null,
          keyCloakInstance: keyCloak,
        }));
      })
      .catch((err) => {
        console.error("KeyCloak initialization error:", err);
        set(() => ({ isLoading: false }));
      });
  },

  loginWithEntraId: async (interactive: boolean): Promise<boolean> => {
    const { getToken } = useMsalLogin();

    try {
      const token = await getToken(interactive);
      if (!token) return false;

      const user = await getDbUser(token);
      set(() => ({
        isAuthenticated: true,
        userGroups: user.groups,
        authToken: token,
        username: user.username,
      }));

      return true;
    } catch (err) {
      return false;
    }
  },

  logout: () => {
    set((state) => {
      const isEntra =
        localStorage.getItem(AUTH_PROVIDER_KEY) === AUTH_PROVIDER_ENTRA;

      if (state.keyCloakInstance) {
        localStorage.clear();
        state.keyCloakInstance.logout({
          redirectUri: `${window.location.origin}/login`,
        });
      } else if (isEntra) {
        const { logout } = useMsalLogin();

        setTimeout(() => {
          localStorage.clear();
        }, 0);
        logout();
      }

      return {
        isLoading: true,
        isAuthenticated: false,
        authToken: null,
        username: null,
        userGroups: [],
        keyCloakInstance: null,
      };
    });
  },
}));

export default useAuthStore;
