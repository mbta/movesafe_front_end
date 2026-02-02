"use client";
import "./stores/msal/msalBootstrap";

import { ScreenNames } from "@repo/constants/screens";
import { Header, MainContainer } from "@repo/ui/components";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Providers from "./context/providers";
import { releaseMove } from "./inspection-forms/actions";
import useAuthStore from "./stores/auth.store";
import useMovesStore from "./stores/move.store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const didLogIn = useRef<boolean>(false);
  const { logout, login, authToken, username } = useAuthStore();
  const router = useRouter();
  const { assignedMove } = useMovesStore();

  const onLogoClick = (): void => {
    router.push(ScreenNames.locationSelection);
  };

  const onLogOutClick = (): void => {
    if (assignedMove) {
      releaseMove(assignedMove.id, authToken ?? "");
    }

    logout();
  };

  useEffect(() => {
    if (didLogIn.current) return;

    didLogIn.current = true;
    const shouldRedirect: boolean = false;
    if (pathname !== ScreenNames.login && pathname !== ScreenNames.index)
      login(shouldRedirect);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <Providers>
          {pathname !== ScreenNames.login && (
            <Header
              username={username}
              onLogout={onLogOutClick}
              onLogoClick={onLogoClick}
            />
          )}
          <MainContainer hasHeader={pathname !== ScreenNames.login}>
            {children}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
