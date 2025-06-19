import type {ItemNode} from "../../types/sidebar/sidebar.type";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {documentNormalizedTree} from "../../store/docs/docs.store";

export default function useBottomNav() {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const navigate = useNavigate();
    const { byId, childrenByParentId } = useRecoilValue(documentNormalizedTree);

    const handleClick = (id: string) => () => {
        navigate("/" + id)
    }

    function getPrevAndNext(): { prev: ItemNode | null, next: ItemNode | null } {
        let prev;
        let next = null;
        const parentId = byId[path].parentId ?? 'root';
        const neighborArray = childrenByParentId[parentId];
        const index = neighborArray.indexOf(path);

        if (0 < index && index < neighborArray.length) {
            prev = byId[neighborArray[index - 1]];
        } else {
            prev = byId[parentId];
        }

        if (!childrenByParentId[path]) {
            if (0 <= index && index + 1 < neighborArray.length) {
                next = byId[neighborArray[index + 1]];
            }
        } else {
            next = byId[childrenByParentId[path][0]];
        }

        if (prev && prev.isDirectory) prev = null;
        if (next && next.isDirectory) next = byId[childrenByParentId[next.id][0]];

        return { prev, next }
    }

    return {
        getPrevAndNext,
        handleClick
    }
}