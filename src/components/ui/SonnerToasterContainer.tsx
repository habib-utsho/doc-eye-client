"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function SonnerToasterContainer() {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setCurrentTheme(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  return (
    <SonnerToaster
      theme={currentTheme}
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        duration: 2000,
        // style: {
        //   borderRadius: "8px",
        // },
        // classNames: {
        //   toast:
        //     "dark:bg-neutral-900 dark:text-white bg-white text-black shadow-lg border",
        // },
      }}
    />
  );
}
