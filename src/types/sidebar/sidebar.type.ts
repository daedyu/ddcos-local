import * as React from "react";

export interface ItemNode {
  id: string;
  path: string;
  parentId: string | null;
  title: string;
  icon: string;
  order: number;
  isDirectory?: boolean;
  Component?: React.ComponentType;
}

export interface NormalizedTree {
  byId: Record<string, ItemNode>;
  childrenByParentId: Record<string, string[]>;
}