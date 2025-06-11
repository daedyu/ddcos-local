import {MDXProvider} from '@mdx-js/react'
import {mdxComponents} from "./MdxComponents.tsx";
import type {ReactNode} from "react";

export function MDXWrapper({ children }: { children: ReactNode }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}