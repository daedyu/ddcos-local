import {DodamGlobalStyles, DodamThemeProvider} from "@b1nd/dds-web";
import * as React from "react";
import {useRecoilValue} from "recoil";
import {resolvedThemeSelector} from "../../store/theme/theme.store";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useRecoilValue(resolvedThemeSelector);

  return (
    <DodamThemeProvider theme={themeMode}>
      <DodamGlobalStyles />
      {children}
    </DodamThemeProvider>
  )
}