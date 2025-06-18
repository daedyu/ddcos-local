import {MDXProvider} from '@mdx-js/react'
import {mdxComponents} from "./MdxComponents.tsx";
import type {ReactNode} from "react";
import styled from "styled-components";
import {DodamTypography} from "@b1nd/dds-web";

export function MDXWrapper({ children }: { children: ReactNode }) {
  return (
    <MdxContainer>
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </MdxContainer>
  );
}

const MdxContainer = styled.div`
    * {
        margin-left: 8%;
    }
    
    li {
        margin-left: 3%;
        margin-top: 1.5%;
        * {
            margin: 0;
        }
    }
    
    p {
        margin-top: 1%;
    }
    
    h1, h2, h3, h4, h5, h6 {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    
    h1 {
        ${DodamTypography.Title1.Bold};
    }
`