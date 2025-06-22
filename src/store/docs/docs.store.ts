import {atom} from "recoil";
import type {NormalizedTree} from "../../types/sidebar/sidebar.type";
import {loadFlatNodes} from "../../utils/docs/docs.loader";
import {normalizeTree} from "../../utils/sidebar/sidebar.util";

// 사이드바 normalizedtree 사용 atom 지정
export const documentNormalizedTree = atom<NormalizedTree>({
  key: 'documentNormalizedTree',
  //normalized tree 기본값으로 지정
  default: normalizeTree(loadFlatNodes())
})