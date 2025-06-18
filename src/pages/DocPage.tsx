import { useParams } from 'react-router-dom'
import { MDXWrapper } from "../mdx/MdxLoader.tsx";
import {useRecoilValue} from "recoil";
import {documentNormalizedTree} from "../store/docs/docs.store";

export default function DocPage() {
  const byId = useRecoilValue(documentNormalizedTree).byId;

  const { '*': slug } = useParams()
  const path = slug || 'index'
  const doc = byId[path];

  if (!doc || !doc.Component) return <div>404 Not Found</div>

  return (
      <MDXWrapper>
        <doc.Component />
      </MDXWrapper>
  )
}