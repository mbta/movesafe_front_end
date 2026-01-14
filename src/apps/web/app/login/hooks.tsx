import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useAuthStore from "../stores/auth.store";

export default function useLogin() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuthStore();

  const handleLoginClick = async () => {
    const shouldRedirect: boolean = true;
    login(shouldRedirect);
  };

  const onLoggedIn = () => {
    router.push(ScreenNames.locationSelection);
  };

  return {
    handleLoginClick,
    onLoggedIn,
    isLoading,
    isAuthenticated,
  };
}
