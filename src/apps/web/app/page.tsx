"use client";
import { ScreenNames } from "@repo/constants/screens";
import { Loader } from "@repo/ui/components";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;

    if (pathname === "/") {
      hasRedirected.current = true;
      router.replace(ScreenNames.login);
    } else {
      router.replace(pathname);
    }
  }, [pathname, router]);

  return <Loader loading={true} />;
}
