import useBottomNav from "../../../hooks/bottomNav/useBottomNav";
import styled from "styled-components";
import {DodamShape, DodamTypography} from "@b1nd/dds-web";
import {ChevronLeft, ChevronRight} from "lucide-react";

export default function BottomNav() {
    const { handleClick, getPrevAndNext } = useBottomNav();
    const {prev, next} = getPrevAndNext()

    return (
        <BottomNavContainer>
            {prev && (
                <BottomNavItem onClick={handleClick(prev.id)}>
                    <ChevronLeft size={18} />
                    <NavTextWrapper align="end">
                        <NavText>Prev</NavText>
                        <NavTitle>{prev.title}</NavTitle>
                    </NavTextWrapper>
                </BottomNavItem>
            )}

            {next && (
                <BottomNavItem onClick={handleClick(next.id)}>
                    <NavTextWrapper align="start">
                        <NavText>Next</NavText>
                        <NavTitle>{next.title}</NavTitle>
                    </NavTextWrapper>
                    <ChevronRight size={18} />
                </BottomNavItem>
            )}
        </BottomNavContainer>
    );
}

const NavText = styled.p`
    color: ${({ theme }) => theme.labelAssistive};
    ${DodamTypography.Label.Regular};
`

const NavTitle = styled.p`
    ${DodamTypography.Headline.Bold};
`

const BottomNavContainer = styled.div`
    height: 80px;
    width: 55%;
    display: flex;
    gap: 13px;
    margin-top: 1.5%;
    margin-bottom: 20%;
    * {
        margin: 0 !important;
    }
`

const NavTextWrapper = styled.div<{align: 'start' | 'end'}>`
    display: flex;
    flex-direction: column;
    align-items: ${({align}) => align};
`

const BottomNavItem = styled.div`
    ${DodamShape.Small};
    display: flex;
    flex: 1;
    flex-direction: row;
    border: ${({ theme }) => `1px solid ${theme.primaryAssistive}`};
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 20px;
    user-select: none;
    
    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.primaryAlternative};
        border: ${({ theme }) => `1px solid ${theme.primaryAlternative}`};
    }
`