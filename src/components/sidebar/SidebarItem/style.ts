import styled from "styled-components";
import {motion} from "framer-motion";
import {lighten} from "polished";

interface ItemContainerProps {
  depth: number;
  $active: boolean;
}

interface ItemProps {
  directory: boolean;
}


export const ItemContainer = styled.div<ItemContainerProps>`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-left: ${({depth}) => depth * 0.8}rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: ${({theme, $active}) => $active ? theme.primaryNormal : theme.labelAlternative};
    background-color: ${({theme, $active}) => $active ? lighten(0.3, theme.primaryAssistive) : 'transparent'};
    border-radius: 0.25rem;
    user-select: none;
    flex: 1;

    &:hover {
        background-color: ${({theme}) => theme.primaryAssistive};
    }
`

export const ItemContent = styled.span<ItemProps>`
    display: flex;
    align-items: center;
    flex: 1;
    color: ${({theme, directory}) => directory ? theme.labelNormal : theme.labelAlternative};
    font-weight: ${({directory}) => directory ? 'bold' : 'normal'};
`

export const ChevronWrapper = styled(motion.span)`
    display: flex;
    align-items: center;
    border-radius: 50%;
    &:hover {
        background-color: ${({theme}) => theme.primaryAssistive};
    }
`;

export const ChildrenWrapper = styled(motion.ul)`
    margin-left: 1.25rem;
    list-style: none;
`