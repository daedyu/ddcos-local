import { docs } from "../../utils/docs/docs.loader.ts";
import SidebarItem from "./SidebarItem.tsx";
import styled from "styled-components";

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItems>
        {docs.map(doc => (
          <SidebarItem key={doc.path} doc={doc} />
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