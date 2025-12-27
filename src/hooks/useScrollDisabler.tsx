import { useEffect } from "react";

export default function useScrollDisabler(enabled?: boolean) {
  const isScrollDisabled = enabled ?? true;

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isScrollDisabled]);

  return {
    isScrollDisabled,
  };
}
