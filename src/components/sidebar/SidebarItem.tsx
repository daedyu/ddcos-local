import { useLocation, useNavigate } from 'react-router-dom';
import { iconMap } from "../../types/icon/icon.type.ts";
import { useState, useEffect } from "react";
import {ChevronRight} from "lucide-react";
import styled from "styled-components";
import * as React from "react";
import {AnimatePresence, motion} from "framer-motion";

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
      <ItemContainer
        depth={depth}
        isActive={isActive}
        onClick={handleClick}
      >
        <ItemContent>
          <Icon size={18} style={{ marginRight: '0.5rem' }} />
          {doc.title}
        </ItemContent>
        {hasChildren && (
          <ChevronWrapper transition={{duration: 0.15}} animate={{ rotate: isExpanded ? 90 : 0 }} onClick={handleOpen}>
            <ChevronRight size={16} />
          </ChevronWrapper>
        )}
      </ItemContainer>
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <ChildrenWrapper
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
          >
            {doc.children?.map(child => (
              <SidebarItem key={child.path} doc={child} depth={depth + 1} />
            ))}
          </ChildrenWrapper>
        )}
      </AnimatePresence>
    </li>
  );
}

interface ItemContainerProps {
  depth: number;
  isActive: boolean;
}

const ItemContainer = styled.div<ItemContainerProps>`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-left: ${({depth}) => depth * 0.8}rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: ${({theme, isActive}) => isActive ? theme.primaryNormal : theme.labelAlternative};
    background-color: ${({isActive}) => isActive ? '#eff9ff' : 'transparent'};
    border-radius: 0.25rem;
    user-select: none;
    flex: 1;

    &:hover {
        background-color: ${({theme}) => theme.primaryAssistive};
    }
`

const ItemContent = styled.span`
    display: flex;
    align-items: center;
    flex: 1;
`

const ChevronWrapper = styled(motion.span)`
    display: flex;
    align-items: center;
    border-radius: 50%;
    &:hover {
        background-color: ${({theme}) => theme.primaryAssistive};
    }
`;

const ChildrenWrapper = styled(motion.ul)`
    margin-left: 1.25rem;
    list-style: none;
`