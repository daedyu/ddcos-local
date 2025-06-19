import {BrowserRouter} from "react-router-dom";
import {Sidebar} from "./components/sidebar/Sidebar.tsx";
import styled from "styled-components";
import Header from "./components/header/Header";
import ThemeProvider from "./components/theme/ThemeProvider";
import Router from "./components/router/Rotuer";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <BodyWrapper>
            <SidebarWrapper>
              <Sidebar />
            </SidebarWrapper>
            <MainScrollArea>
              <Router/>
            </MainScrollArea>
          </BodyWrapper>
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    
    color: ${({ theme }) => theme.labelNormal};

    background: linear-gradient(
            to top right,
            ${({ theme }) => theme.backgroundNormal} 40%,
            ${({ theme }) => theme.primaryAlternative} 400%
    );
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 0; /* MainScrollArea overflow 작동 위해 */
`;

const SidebarWrapper = styled.div`
  width: 20vw;
  padding-left: 1em;
  flex-shrink: 0;
  overflow-y: auto;
`;

const MainScrollArea = styled.main`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
    padding-left: 1em;
    gap: 1em;

    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.primaryAlternative} transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.5);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;