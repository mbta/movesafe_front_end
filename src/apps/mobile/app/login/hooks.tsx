import { ScreenNames } from "@repo/constants/screens";
import { useRouter } from "next/navigation";
import useAuthStore, {
  AUTH_PROVIDER_ENTRA,
  AUTH_PROVIDER_KEY,
} from "../stores/auth.store";

export default function useLogin() {
  const router = useRouter();
  const { login, loginWithEntraId, isLoading, setIsLoading, isAuthenticated } =
    useAuthStore();

  const handleLoginClick = async () => {
    const shouldRedirect: boolean = true;
    login(shouldRedirect);
  };

  const handleEntraIdLogin = async (): Promise<void> => {
    localStorage.setItem(AUTH_PROVIDER_KEY, AUTH_PROVIDER_ENTRA);
    await loginWithEntraId(true);
  };

  const checkAuthStatus = async (): Promise<boolean | null> => {
    const authProvider = localStorage.getItem(AUTH_PROVIDER_KEY);
    if (authProvider !== AUTH_PROVIDER_ENTRA) return null;

    const success = await loginWithEntraId(false);
    if (!success) localStorage.removeItem(AUTH_PROVIDER_KEY);

    return success;
  };

  const onLoggedIn = () => {
    router.replace(ScreenNames.locationSelection);
  };

  return {
    handleLoginClick,
    handleEntraIdLogin,
    checkAuthStatus,
    onLoggedIn,
    isLoading,
    setIsLoading,
    isAuthenticated,
  };
}
