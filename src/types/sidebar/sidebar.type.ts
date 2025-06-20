import * as React from "react";

export interface ItemNode {
  id: string;
  parentId: string | null;
  title: string;
  icon: string | null;
  order: number;
  isDirectory?: boolean;
  Component?: React.ComponentType;
}

export interface NormalizedTree {
  byId: Record<string, ItemNode>;
  childrenByParentId: Record<string, string[]>;
}