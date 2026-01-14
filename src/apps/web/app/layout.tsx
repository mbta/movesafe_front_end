"use client";
import { Inter } from "next/font/google";
import Providers from "./context/providers";
import { Header, MainContainer } from "@repo/ui/components";
import { usePathname, useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useAuthStore from "./stores/auth.store";
import { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const didLogIn = useRef<boolean>(false);
  const { logout, login, username } = useAuthStore();
  const router = useRouter();

  const onLogoClick = (): void => {
    router.push(ScreenNames.locationSelection);
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
              showUserInfo={true}
              onLogout={logout}
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
