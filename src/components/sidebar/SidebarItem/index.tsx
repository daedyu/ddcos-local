import { useLocation, useNavigate } from 'react-router-dom';
import { iconMap } from "../../../types/icon/icon.type.ts";
import { useState, useEffect } from "react";
import {ChevronRight} from "lucide-react";
import * as React from "react";
import {AnimatePresence} from "framer-motion";
import * as S from "./style";
import type {NormalizedTree} from "../../../types/sidebar/sidebar.type";

type IconType = keyof typeof iconMap;

interface SidebarItemProps {
  path: string;
  depth?: number;
  normalizeTree: NormalizedTree;
}

export default function SidebarItem({ path, depth = 0, normalizeTree }: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const hasChildren = normalizeTree.childrenByParentId[path]?.length > 0;

  const docs = normalizeTree.byId[path]

  const Icon = iconMap[docs.icon as IconType] || (docs.isDirectory ? iconMap.folder : null);
  const isActive: boolean = location.pathname === '/' + path;

  const [isExpanded, setIsExpanded] = useState(() => {
    if (!hasChildren) return false;
    return location.pathname.startsWith('/' + path);
  });

  useEffect(() => {
    if (location.pathname.startsWith('/' + docs.id)) {
      setIsExpanded(true);
    }
  }, [location.pathname, docs.id]);

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

    if (!docs.isDirectory) {
      navigate(docs.id);
    } else if (hasChildren) {
      handleOpen(e);
    }
  };

  return (
    <li>
      <S.ItemContainer
        depth={depth}
        $active={isActive}
        onClick={handleClick}
      >
        <S.ItemContent directory={docs.isDirectory ? docs.isDirectory : false}>
          <Icon size={18} style={{ marginRight: '0.5rem' }} />
          {docs.title}
        </S.ItemContent>
        {hasChildren && (
          <S.ChevronWrapper transition={{duration: 0.15}} animate={{ rotate: isExpanded ? 90 : 0 }} onClick={handleOpen}>
            <ChevronRight size={16} />
          </S.ChevronWrapper>
        )}
      </S.ItemContainer>
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <S.ChildrenWrapper
            initial={{ opacity: 0, height: 0, y: -10  }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.12, ease: "easeInOut" }}
          >
            {normalizeTree.childrenByParentId[path].map(child => (
              <SidebarItem key={child} normalizeTree={normalizeTree} path={child} depth={depth + 1} />
            ))}
          </S.ChildrenWrapper>
        )}
      </AnimatePresence>
    </li>
  );
}
