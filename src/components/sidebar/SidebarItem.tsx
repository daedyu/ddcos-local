import { useLocation, useNavigate } from 'react-router-dom';
import { iconMap } from "../../types/icon/icon.type.ts";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type IconType = keyof typeof iconMap;

interface DocItem {
  path: string;
  title: string;
  icon: string;
  order: number;
  Component?: React.ComponentType;
  children?: DocItem[];
  isDirectory?: boolean;
}

interface SidebarItemProps {
  doc: DocItem;
  depth?: number;
}

export default function SidebarItem({ doc, depth = 0 }: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const hasChildren = doc.children && doc.children.length > 0;
  const Icon = iconMap[doc.icon as IconType] || (doc.isDirectory ? iconMap.folder : iconMap.file);
  const isActive = location.pathname === doc.path;
  
  const [isExpanded, setIsExpanded] = useState(() => {
    if (!hasChildren) return false;
    return location.pathname.startsWith(doc.path);
  });

  useEffect(() => {
    if (location.pathname.startsWith(doc.path)) {
      setIsExpanded(true);
    }
  }, [location.pathname, doc.path]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasChildren) {
      setIsExpanded(true);
    }

    if (!doc.isDirectory) {
      navigate(doc.path);
    } else if (hasChildren) {
      const firstDoc = findFirstDocument(doc);
      if (firstDoc) {
        navigate(firstDoc.path);
      }
    }
  };

  const findFirstDocument = (item: DocItem): DocItem | null => {
    if (!item.isDirectory && item.Component) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        const found = findFirstDocument(child);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <li>
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: `${depth * 1.5}rem`,
          marginBottom: '0.5rem',
          cursor: 'pointer',
          color: isActive ? '#2563eb' : doc.isDirectory ? '#666' : '#000',
          backgroundColor: isActive ? '#f3f4f6' : 'transparent',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          userSelect: 'none',
        }}
      >
        <span style={{ 
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}>
          <Icon size={18} style={{ marginRight: '0.5rem' }} />
          {doc.title}
        </span>
        {hasChildren && (
          <span onClick={handleOpen} style={{ marginRight: '0.25rem', display: 'flex', alignItems: 'center' }}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <ul style={{ listStyle: 'none', padding: 0, marginLeft: '0.5rem' }}>
          {doc.children?.map(child => (
            <SidebarItem key={child.path} doc={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}