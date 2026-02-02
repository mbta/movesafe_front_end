import {
  PublicClientApplication,
  RedirectRequest,
  type Configuration,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_ENTRA_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_ENTRA_AUTHORITY,
    redirectUri: process.env.NEXT_PUBLIC_ENTRA_REDIRECT_URI,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_ENTRA_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: RedirectRequest = {
  scopes: ["User.Read", "email"],
  redirectUri: process.env.NEXT_PUBLIC_ENTRA_REDIRECT_URI,
};

export const msalInstance = new PublicClientApplication(msalConfig);
