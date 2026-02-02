"use client";

const BOOTSTRAP_KEY = "__msal_bootstrap_href__";

if (typeof window !== "undefined") {
  const href = window.location.href;

  if (
    href.includes("/login") &&
    (href.includes("#code=") || href.includes("?code="))
  ) {
    (window as any)[BOOTSTRAP_KEY] = href;
  }
}

export function restoreMsalResponseToUrlIfMissing(): void {
  if (typeof window === "undefined") return;

  const bootHref = (window as any)[BOOTSTRAP_KEY] as string | undefined;
  if (!bootHref) return;

  const hashIndex = bootHref.indexOf("#");
  if (hashIndex >= 0 && !window.location.hash) {
    const bootHash = bootHref.substring(hashIndex);
    window.history.replaceState(
      window.history.state,
      document.title,
      window.location.pathname + window.location.search + bootHash,
    );
  }
}
