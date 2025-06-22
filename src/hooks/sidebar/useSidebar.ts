import {useLocation, useNavigate} from "react-router-dom";
import {iconMap} from "../../types/icon/icon.type";
import {useEffect, useState} from "react";
import * as React from "react";
import {useRecoilValue} from "recoil";
import {documentNormalizedTree} from "../../store/docs/docs.store";

type IconType = keyof typeof iconMap;

interface UseSidebarProps {
    path: string;
}

//sidebar hooks
export default function useSidebar({path}: UseSidebarProps) {
    const normalizedTree = useRecoilValue(documentNormalizedTree)
    const location = useLocation();
    const navigate = useNavigate();
    const hasChildren = normalizedTree.childrenByParentId[path]?.length > 0;
    const docs = normalizedTree.byId[path]
    const isActive = location.pathname === '/' + path;
    const isParent = location.pathname.startsWith('/' + path)
    const [isExpanded, setIsExpanded] = useState(!hasChildren ? false: isParent);

    //자식 파일을 조회할시
    useEffect(() => {
        if (isParent) setIsExpanded(true);
    }, [isParent]);

    // 오픈 머튼을 누르면 생기는일
    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }

    // 객체를 클릭하면 생기는일
    const handleClick = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(true);
        }

        if (!docs.isDirectory) {
            navigate(docs.id);
        } else if (hasChildren) {
            handleOpen(e);
        }
    };

    //mdx 아이콘 맵으로 component 반환
    const Icon = iconMap[docs.icon as IconType] || null;

    // 자식반환
    const children = normalizedTree.childrenByParentId[path];

    return {
        Icon,
        docs,
        handleClick,
        handleOpen,
        hasChildren,
        isActive,
        isExpanded,
        children
    }
}