import yaml from 'js-yaml';
import * as React from "react";
import type {FrontMatter} from "../../types/docs/docs.type";
import type {ItemNode} from "../../types/sidebar/sidebar.type";

//raw 데이터 모듈 호츌
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

//폴더 노드 호출
function createDirectoryNodes(filePaths: string[]): ItemNode[] {
  const directories = new Set<string>();

  for (const path of filePaths) {
    const parts = path.split('/');
    for (let i = 1; i < parts.length; i++) {
      directories.add(parts.slice(0, i).join('/'));
    }
  }

  // itemNode 객체 배열 생성 후 반환
  return Array.from(directories).map(dir => ({
      id: dir,
      parentId: dir.includes('/') ? dir.substring(0, dir.lastIndexOf('/')) : null,
      title: dir.split('/').pop() ?? 'Untitled',
      order: 0,
      isDirectory: true,
    } as ItemNode
  ));
}

// 파일 노드 호출
function createFileNodes(): ItemNode[] {
  //ItemNode 객체 배열 반환
  return Object.entries(rawModules).map(([path, raw]) => {
    // 파일 조회
    const filePath = path.replace('../../docs/', '').replace('.mdx', '').replace(/\./g, '/');
    // frontMatter 조회
    const { title, icon, order } = parseFrontMatter(raw as string);
    // 파일명 조회
    const fileName = filePath.split('/').pop() ?? 'Untitled';

    //ItemNode 객체 반환
    return {
      id: filePath,
      parentId: filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : null,
      title: title ?? fileName,
      icon: icon,
      order: order ?? 99,
      isDirectory: false,
      Component: (modules as Record<string, { default: React.ComponentType }>)[path].default
    } as ItemNode;
  });
}

// 평탄화 트리 호출
export function loadFlatNodes(): ItemNode[] {
  const filePaths = Object.keys(rawModules).map(path =>
    path.replace('../../docs/', '').replace('.mdx', '')
  );

  const fileNodes = createFileNodes();
  const dirNodes = createDirectoryNodes(filePaths);
  //파일과 폴더 노드 합쳐서 반환
  return [...fileNodes, ...dirNodes];
}