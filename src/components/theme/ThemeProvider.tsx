import {DodamGlobalStyles, DodamThemeProvider} from "@b1nd/dds-web";

export default function ThemeProvider() {
  return (
    <DodamThemeProvider theme={'LIGHT'}>
      <DodamGlobalStyles />

    </DodamThemeProvider>
  )
}