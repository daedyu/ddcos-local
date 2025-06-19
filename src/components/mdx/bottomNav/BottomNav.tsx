import useBottomNav from "../../../hooks/bottomNav/useBottomNav";
import styled from "styled-components";
import {DodamShape} from "@b1nd/dds-web";
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
                        <p>prev</p>
                        <p>{prev.title}</p>
                    </NavTextWrapper>
                </BottomNavItem>
            )}

            {next && (
                <BottomNavItem onClick={handleClick(next.id)}>
                    <NavTextWrapper align="start">
                        <p>next</p>
                        <p>{next.title}</p>
                    </NavTextWrapper>
                    <ChevronRight size={18} />
                </BottomNavItem>
            )}
        </BottomNavContainer>
    );
}

const BottomNavContainer = styled.div`
    height: 80px;
    width: 55%;
    display: flex;
    gap: 13px;
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