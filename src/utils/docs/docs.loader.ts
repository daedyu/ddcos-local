import type {ComponentType} from "react";
import yaml from 'js-yaml';

interface DocItem {
  path: string;
  title: string;
  icon: string;
  order: number;
  Component?: ComponentType;
  children?: DocItem[];
  isDirectory?: boolean;
}

interface FrontMatter {
  title?: string;
  icon?: string;
  order?: number;
}

const rawModules = import.meta.glob('../../docs/**/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
})
const modules = import.meta.glob('../../docs/**/*.mdx', { eager: true })

function parseFrontMatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content };
  
  try {
    const frontMatter = yaml.load(match[1]) as FrontMatter;
    return {
      data: frontMatter || {},
      content: content.replace(/^---\n[\s\S]*?\n---/, '').trim()
    };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { data: {}, content };
  }
}

function createDirectoryStructure(paths: string[]): Map<string, DocItem> {
  const directories = new Map<string, DocItem>();
  
  paths.forEach(path => {
    const parts = path.split('/');
    let currentPath = '';
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const newPath = currentPath ? `${currentPath}/${part}` : part;
      
      if (!directories.has(newPath)) {
        directories.set(newPath, {
          path: '/' + newPath,
          title: part.charAt(0).toUpperCase() + part.slice(1),
          icon: 'folder',
          order: 0,
          isDirectory: true,
          children: []
        });
      }
      
      currentPath = newPath;
    }
  });
  
  return directories;
}

function organizeDocsHierarchy(flatDocs: DocItem[]): DocItem[] {
  // 먼저 모든 파일 경로에서 디렉토리 구조를 생성
  const paths = Object.keys(rawModules).map(path => 
    path.replace('../../docs/', '').replace('.mdx', '')
  );
  const directories = createDirectoryStructure(paths);
  
  // 모든 문서와 디렉토리를 맵에 추가
  const docsMap = new Map<string, DocItem>([...directories]);
  flatDocs.forEach(doc => {
    const pathWithoutSlash = doc.path.startsWith('/') ? doc.path.slice(1) : doc.path;
    docsMap.set(pathWithoutSlash, { ...doc, children: [] });
  });

  const rootDocs: DocItem[] = [];

  // 문서와 디렉토리 계층 구조 구성
  docsMap.forEach((doc, path) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const fileNameParts = fileName.split('.');

    if (fileNameParts.length > 1 && !doc.isDirectory) {
      // 점(.)으로 구분된 하위 문서 처리
      const parentPath = parts.slice(0, -1).join('/') + '/' + fileNameParts[0];
      const parent = docsMap.get(parentPath);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(doc);
        parent.children.sort((a, b) => a.order - b.order);
        return;
      }
    }

    if (parts.length > 1) {
      // 디렉토리 내부의 파일/디렉토리 처리
      const parentPath = parts.slice(0, -1).join('/');
      const parent = docsMap.get(parentPath);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(doc);
        parent.children.sort((a, b) => a.order - b.order);
        return;
      }
    }

    rootDocs.push(doc);
  });

  return rootDocs.sort((a, b) => a.order - b.order);
}

// flatDocs 생성 부분 수정
const flatDocs = Object.entries(rawModules).map(([path, raw]) => {
  // 경로에서 '../../docs/' 부분을 제거하고 .mdx 확장자도 제거
  const filePath = path.replace('../../docs/', '').replace('.mdx', '')
  const { data } = parseFrontMatter(raw as string)

  // Component 매핑을 위한 원래 path 보존
  return {
    path: '/' + filePath,  // URL 경로용
    title: data.title ?? filePath.split('/').pop()?.split('.')[0] ?? 'Untitled',
    icon: data.icon ?? 'file',
    order: data.order ?? 99,
    Component: (modules as Record<string, { default: ComponentType }>)[path].default, // 원래 path 사용
  };
});

// 디버깅용 로그 추가
console.log('Available modules:', Object.keys(modules));
console.log('Raw modules:', Object.keys(rawModules));

export const docs = organizeDocsHierarchy(flatDocs);

// 최종 문서 구조 로깅
console.log('Final docs structure:', JSON.stringify(docs, null, 2));