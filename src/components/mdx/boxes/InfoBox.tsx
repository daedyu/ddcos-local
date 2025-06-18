import {Box} from "./Box";
import {Info} from "lucide-react";
import {useTheme} from "styled-components";

export default function InfoBox ({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <Box
      icon={Info}
      color={theme.primaryNormal}
      backgroundColor={theme.primaryAssistive}
    >
      {children}
    </Box>
  );
};
