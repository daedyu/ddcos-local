import type {ItemNode, NormalizedTree} from "../../types/sidebar/sidebar.type";

export function normalizeTree(nodes: ItemNode[]): NormalizedTree {
  //객체 map
  const byId: Record<string, ItemNode> = {};
  //객체 관계 배열
  const childrenByParentId: Record<string, string[]> = {};

  for (const node of nodes) {
    byId[node.id] = node;

    const parentId = node.parentId ?? 'root';
    if (!childrenByParentId[parentId]) {
      childrenByParentId[parentId] = [];
    }

    childrenByParentId[parentId].push(node.id);
  }

  for (const parentId in childrenByParentId) {
    childrenByParentId[parentId].sort(
      (a, b) => byId[a].order - byId[b].order
    );
  }

  return { byId, childrenByParentId };
}
