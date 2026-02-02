import type { SilentRequest } from "@azure/msal-browser";
import { restoreMsalResponseToUrlIfMissing } from "./msalBootstrap";
import { loginRequest, msalInstance } from "./msalConfig";

let isInitialized = false;
let isRedirectHandled = false;

const useMsalLogin = () => {
  const initialize = async () => {
    if (isInitialized) return;

    isInitialized = true;
    await msalInstance.initialize();
  };

  const handleRedirect = async () => {
    if (isRedirectHandled) return;

    isRedirectHandled = true;
    try {
      restoreMsalResponseToUrlIfMissing();
      const res = await msalInstance.handleRedirectPromise();

      if (res?.account) msalInstance.setActiveAccount(res.account);
    } catch (e) {
      // Fail silently
    }
  };

  const getAccount = async () => {
    await initialize();
    await handleRedirect();

    const active = msalInstance.getActiveAccount();
    if (active) return active;

    const all = msalInstance.getAllAccounts();
    if (all.length > 0) {
      msalInstance.setActiveAccount(all[0]);
      return all[0];
    }

    return null;
  };

  const ensureLogin = async (interactive: boolean) => {
    const account = await getAccount();
    if (account) return account;

    if (interactive) await msalInstance.loginRedirect({ ...loginRequest });
    return null;
  };

  const getToken = async (interactive: boolean) => {
    const account = await ensureLogin(interactive);
    if (!account) return null;

    try {
      const res = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account,
      } as SilentRequest);
      return res.accessToken;
    } catch {
      await msalInstance.acquireTokenRedirect({
        ...loginRequest,
        account,
      });
    }
  };

  const logout = async () => {
    const account = await getAccount();
    if (account) await msalInstance.logoutRedirect({ account });
  };

  return {
    getToken,
    logout,
  };
};

export default useMsalLogin;
