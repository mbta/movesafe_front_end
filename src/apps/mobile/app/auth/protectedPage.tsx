"use-client";
import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@repo/ui/components";
import useAuthStore from "../stores/auth.store";

const ProtectedPage = (Page: React.FC, allowedRoles: string[]) => {
  const WithProtectedPage: React.FC = () => {
    const { isLoading, isAuthenticated, userGroups } = useAuthStore();
    const router = useRouter();

    const [isChecking, setIsChecking] = useState<boolean>(true);

    useLayoutEffect(() => {
      if (isLoading) return;

      if (
        !isAuthenticated ||
        !userGroups.find((g) => allowedRoles.includes(g))
      ) {
        router.push("/location-selection");
      } else {
        setIsChecking(false);
      }
    }, [router, allowedRoles, userGroups, isAuthenticated, isLoading]);

    if (isLoading || isChecking)
      return <Loader loading={isLoading || isChecking} />;
    return <Page />;
  };

  return WithProtectedPage;
};

export default ProtectedPage;
