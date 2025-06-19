import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import {useRecoilValue} from "recoil";
import {documentNormalizedTree} from "../../store/docs/docs.store";

export function Sidebar() {
    const tree = useRecoilValue(documentNormalizedTree)

    return (
        <SidebarContainer>
            <SidebarItems>
                {tree.childrenByParentId['root'].map(rootId => (
                    <SidebarItem
                        key={rootId}
                        depth={0}
                        path={rootId}
                    />
                ))}
            </SidebarItems>
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
    padding: 1rem;
    transition: all 0.3s ease-in-out;
`

const SidebarItems = styled.ul`
    list-style: none;
    padding: 0;
`