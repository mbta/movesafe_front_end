import { create } from 'zustand';
import Keycloak, { KeycloakInitOptions } from "keycloak-js";

interface IAuthStore {
    isLoading: boolean;
    keyCloakInstance: Keycloak | null;
    isAuthenticated: boolean;
    authToken: string | null;
    userGroups: string[];
    username: string | null;
    setIsLoading(isLoading: boolean): void;
    login: (shouldRedirect: boolean) => void;
    logout: () => void;
}

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_ADDRESS ?? "",
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "",
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? ""
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
        let initOptions: KeycloakInitOptions = { onLoad: "login-required", checkLoginIframe: false };

        if (shouldRedirect) {
            initOptions = { ...initOptions, redirectUri: `${window.location.origin}/location-selection` };
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
    logout: () => {
        set((state) => {
            localStorage.clear();
            if (state.keyCloakInstance) {
                state.keyCloakInstance.logout({
                    redirectUri: `${window.location.origin}/login`,
                });
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
    }
}))

export default useAuthStore;