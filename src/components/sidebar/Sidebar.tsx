import { docs } from "../../utils/docs/docs.loader.ts";
import SidebarItem from "./SidebarItem.tsx";

export function Sidebar() {
  return (
    <div style={{ width: 250, borderRight: '1px solid #ddd', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {docs.map(doc => (
          <SidebarItem key={doc.path} doc={doc} />
        ))}
      </ul>
    </div>
  );
}