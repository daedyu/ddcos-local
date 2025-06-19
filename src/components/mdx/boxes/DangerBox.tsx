import * as React from "react";
import {useTheme} from "styled-components";
import {useRecoilValue} from "recoil";
import {resolvedThemeSelector} from "../../../store/theme/theme.store";
import {darken, lighten} from "polished";
import {Box} from "./Box";
import {TriangleAlert} from "lucide-react";

export default function DangerBox({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const themeMode = useRecoilValue(resolvedThemeSelector);

    const backgroundColor = themeMode === 'DARK' ? darken(0.37, theme.statusNegative) : lighten(0.3, theme.statusNegative);

    return (
        <Box
            icon={TriangleAlert}
            color={theme.statusNegative}
            backgroundColor={backgroundColor}
        >
            {children}
        </Box>
    );
};
