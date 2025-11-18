"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@repo/ui/components";
import { usePathname } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") router.push(ScreenNames.login);
    else router.push(pathname);
  }, []);

  return <Loader loading={true} />;
}
