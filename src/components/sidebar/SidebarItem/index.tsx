import {ChevronRight} from "lucide-react";
import {AnimatePresence} from "framer-motion";
import * as S from "./style";
import useSidebar from "../../../hooks/sidebar/useSidebar";

interface SidebarItemProps {
    path: string;
    depth?: number;
}

export default function SidebarItem({ path, depth = 0 }: SidebarItemProps) {
    const {Icon, handleClick, handleOpen,isActive, isExpanded, docs, hasChildren, children} = useSidebar({path});

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
                        {children.map(child => (
                            <SidebarItem key={child} path={child} depth={depth + 1} />
                        ))}
                    </S.ChildrenWrapper>
                )}
            </AnimatePresence>
        </li>
    );
}
