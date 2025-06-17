import {BrowserRouter, Route, Routes} from "react-router-dom";
import DocPage from "./pages/DocPage.tsx";
import {Sidebar} from "./components/sidebar/Sidebar.tsx";
import {DodamGlobalStyles, DodamThemeProvider} from "@b1nd/dds-web";
import styled from "styled-components";
import Header from "./components/header/Header";

export default function App() {
  return (
    <DodamThemeProvider theme={'LIGHT'}>
      <DodamGlobalStyles />
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <BodyWrapper>
            <SidebarWrapper>
              <Sidebar />
            </SidebarWrapper>
            <MainScrollArea>
              <Routes>
                <Route path="*" element={<DocPage />} />
              </Routes>
            </MainScrollArea>
          </BodyWrapper>
        </AppWrapper>
      </BrowserRouter>
    </DodamThemeProvider>
  )
}

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

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
`;