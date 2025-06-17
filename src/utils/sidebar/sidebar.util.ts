import type {ItemNode, NormalizedTree} from "../../types/sidebar/sidebar.type";

export function normalizeTree(nodes: ItemNode[]): NormalizedTree {
  const byId: Record<string, ItemNode> = {};
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
