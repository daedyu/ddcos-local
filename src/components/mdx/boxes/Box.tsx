import * as React from "react";
import styled from "styled-components";
import {DodamShape} from "@b1nd/dds-web";
import type {LucideIcon} from "lucide-react";

type CustomBoxProps = {
  icon: LucideIcon;
  color: string;
  backgroundColor: string;
  children: React.ReactNode;
};

export const Box = ({ icon: Icon, color, backgroundColor, children }: CustomBoxProps) => (
  <BoxWrapper $backgroundColor={backgroundColor}>
    <StyledIcon as={Icon} $color={color} size={20} />
    {children}
  </BoxWrapper>
);

const BoxWrapper = styled.div<{ $backgroundColor: string }>`
    padding: 1rem;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    ${DodamShape.Small};
    width: 55%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
`;

const StyledIcon = styled.div<{ $color: string }>`
    margin: 0 !important;
    color: ${({ $color }) => $color};
`;