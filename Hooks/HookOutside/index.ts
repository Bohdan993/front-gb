import { useEffect, useRef } from "react";

interface OutsideCallback {
  (): void;
}
export const HookOutside = (callback: OutsideCallback) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e && (e.target as HTMLElement))
      ) {
        callback();
      }
    };
    document.addEventListener("click", outsideClick, true);
    return () => {
      document.removeEventListener("click", outsideClick, true);
    };
  }, [callback, ref]);
  return ref;
};
