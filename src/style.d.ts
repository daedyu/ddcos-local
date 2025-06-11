import 'styled-components';
import type { DodamTheme } from '@b1nd/dds-web/dist/types/theme';

declare module 'styled-components' {
  export type DefaultTheme = DodamTheme
}
