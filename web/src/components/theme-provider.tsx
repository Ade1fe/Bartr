"use client"

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: this is the standard mounted-flag pattern for avoiding hydration mismatch, not a derivable value
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>
      {children}
    </>
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}