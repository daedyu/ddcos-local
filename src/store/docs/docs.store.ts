import {atom} from "recoil";
import type {NormalizedTree} from "../../types/sidebar/sidebar.type";
import {loadFlatNodes} from "../../utils/docs/docs.loader";
import {normalizeTree} from "../../utils/sidebar/sidebar.util";

export const documentNormalizedTree = atom<NormalizedTree>({
  key: 'documentNormalizedTree',
  default: normalizeTree(loadFlatNodes())
})