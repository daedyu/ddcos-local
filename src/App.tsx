import {BrowserRouter, Route, Routes} from "react-router-dom";
import DocPage from "./pages/DocPage.tsx";
import {Sidebar} from "./components/sidebar/Sidebar.tsx";
import {DodamGlobalStyles, DodamThemeProvider} from "@b1nd/dds-web";
import styled from "styled-components";

function App() {
  return (

        <DodamThemeProvider theme={'LIGHT'}>
          <DodamGlobalStyles />
          <BrowserRouter>
          <MainContainer>
          <Sidebar />
          <Routes>
            <Route path="*" element={<DocPage />} />
          </Routes>
        </MainContainer>
          </BrowserRouter>
        </DodamThemeProvider>

  )
}

export default App

const MainContainer = styled.div`
    display: flex;
    background: linear-gradient(
        to top right, 
        ${({theme}) => theme.backgroundAlternative} 70%, 
        ${({theme}) => theme.primaryAlternative} 200%
    );
`