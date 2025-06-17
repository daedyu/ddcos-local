import { useParams } from 'react-router-dom'
import { docs } from "../utils/docs/docs.loader.ts";
import { MDXWrapper } from "../mdx/MdxLoader.tsx";
import styled from "styled-components";

function findDoc(path: string) {
  function searchInDocs(docsList: typeof docs): typeof docs[0] | undefined {
    for (const doc of docsList) {
      if (doc.path === path) return doc;
      if (doc.children) {
        const found = searchInDocs(doc.children);
        if (found) return found;
      }
    }
    return undefined;
  }
  
  return searchInDocs(docs);
}

export default function DocPage() {
  const { '*': slug } = useParams()
  const path = '/' + (slug || 'index')
  
  const doc = findDoc(path);

  if (!doc || !doc.Component) return <div>문서를 찾을 수 없습니다.</div>

  return (
    <MainContainer>
      <MDXWrapper>
        <doc.Component />
      </MDXWrapper>
    </MainContainer>
  )
}

const MainContainer = styled.main`
    flex: 8;
    height: 100vh;
`