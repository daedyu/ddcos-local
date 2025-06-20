import yaml from 'js-yaml';
import * as React from "react";
import type {FrontMatter} from "../../types/docs/docs.type";
import type {ItemNode} from "../../types/sidebar/sidebar.type";

const rawModules = import.meta.glob('../../docs/**/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const modules = import.meta.glob('../../docs/**/*.mdx', { eager: true })

function parseFrontMatter(raw: string): FrontMatter {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  try {
    return (yaml.load(match[1]) || {}) as FrontMatter;
  } catch (error) {
    console.error('parsing error:', error);
    return {};
  }
}

function createDirectoryNodes(filePaths: string[]): ItemNode[] {
  const directories = new Set<string>();

  for (const path of filePaths) {
    const parts = path.split('/');
    for (let i = 1; i < parts.length; i++) {
      directories.add(parts.slice(0, i).join('/'));
    }
  }

  return Array.from(directories).map(dir => ({
      id: dir,
      parentId: dir.includes('/') ? dir.substring(0, dir.lastIndexOf('/')) : null,
      title: dir.split('/').pop() ?? 'Untitled',
      order: 0,
      isDirectory: true,
    } as ItemNode
  ));
}

function createFileNodes(): ItemNode[] {
  return Object.entries(rawModules).map(([path, raw]) => {
    const filePath = path.replace('../../docs/', '').replace('.mdx', '').replace('.', '/');
    const { title, icon, order } = parseFrontMatter(raw as string);
    const fileName = filePath.split('/').pop() ?? 'Untitled';

    return {
      id: filePath,
      parentId: filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : null,
      title: title ?? fileName,
      icon: icon ?? 'file',
      order: order ?? 99,
      isDirectory: false,
      Component: (modules as Record<string, { default: React.ComponentType }>)[path].default
    } as ItemNode;
  });
}

export function loadFlatNodes(): ItemNode[] {
  const filePaths = Object.keys(rawModules).map(path =>
    path.replace('../../docs/', '').replace('.mdx', '')
  );

  const fileNodes = createFileNodes();
  const dirNodes = createDirectoryNodes(filePaths);

  return [...fileNodes, ...dirNodes];
}