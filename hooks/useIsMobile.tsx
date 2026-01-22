import { useSyncExternalStore } from "react";

export default function useIsMobile() {
  const maxWidth = 600; // similar to MUI "sm"
  const query = `(max-width: ${maxWidth}px)`;

  const subscribe = (onStoreChange: () => void) => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return () => {};
    }

    const mql = window.matchMedia(query);
    const handler = () => onStoreChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    // Fallback for older browsers (Safari/old Chromium)
    if (typeof (mql as MediaQueryList).addListener === "function") {
      (mql as MediaQueryList).addListener(handler);
      return () => (mql as MediaQueryList).removeListener(handler);
    }

    return () => {};
  };

  const getSnapshot = () =>
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined"
      ? window.matchMedia(query).matches
      : false;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
