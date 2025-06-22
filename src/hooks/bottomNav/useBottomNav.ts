import type {ItemNode} from "../../types/sidebar/sidebar.type";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {documentNormalizedTree} from "../../store/docs/docs.store";

//bottom nav hook
export default function useBottomNav() {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const navigate = useNavigate();
    const { byId, childrenByParentId } = useRecoilValue(documentNormalizedTree);

    //클릭시
    const handleClick = (id: string) => () => {
        navigate("/" + id)
    }

    //이전과 다음 파일 표시
    function getPrevAndNext(): { prev: ItemNode | null, next: ItemNode | null } {
        let prev;
        let next = null;
        const parentId = byId[path].parentId ?? 'root';
        const neighborArray = childrenByParentId[parentId];
        const index = neighborArray.indexOf(path);

        // index 가 0보다 크고 이웃배열크기보다 작다면
        if (0 < index && index < neighborArray.length) {
            // 현재 인덱스 - 1
            prev = byId[neighborArray[index - 1]];
        } else {
            // 부모를 prev 로
            prev = byId[parentId];
        }

        // 자식이 존재하지 않는다면
        if (!childrenByParentId[path]) {
            //이웃중 다음 index를 next 로 지정
            if (0 <= index && index + 1 < neighborArray.length) {
                next = byId[neighborArray[index + 1]];
            }
        } else {
            //자식 개체를 지정
            next = byId[childrenByParentId[path][0]];
        }

        // prev 나 next 가 폴더일경우 prev 는 null, next 는 폴더의 자식으로 지정
        if (prev && prev.isDirectory) prev = null;
        if (next && next.isDirectory) next = byId[childrenByParentId[next.id][0]];

        return { prev, next }
    }

    return {
        getPrevAndNext,
        handleClick
    }
}