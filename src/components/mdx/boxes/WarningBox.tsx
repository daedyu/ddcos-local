import {useTheme} from "styled-components";
import {Box} from "./Box";
import {TriangleAlert} from "lucide-react";
import {darken, lighten} from "polished";
import * as React from "react";
import {resolvedThemeSelector} from "../../../store/theme/theme.store";
import {useRecoilValue} from "recoil";

export default function WarningBox({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const themeMode = useRecoilValue(resolvedThemeSelector);

  const backgroundColor = themeMode === 'DARK' ? darken(0.27, theme.statusCautionary) : lighten(0.35, theme.statusCautionary);

  return (
    <Box
      icon={TriangleAlert}
      color={theme.statusCautionary}
      backgroundColor={backgroundColor}
    >
      {children}
    </Box>
  );
};
