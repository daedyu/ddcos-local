import styled from "styled-components";
import {Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {DodamShape} from "@b1nd/dds-web";
import {Select} from "./Select";
import {themePreferenceAtom} from "../../store/theme/theme.store";
import {useRecoilState} from "recoil";

export default function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState(themePreferenceAtom);
    return (
        <HeaderContainer>
          <LogoWrapper onClick={() => navigate('/')}>
            <Logo src="/b1nd.svg" />
            <h3>DDocs</h3>
          </LogoWrapper>
          <SearchBar>
            <Search/>
            Search...
          </SearchBar>
          <Select items={['DARK', 'LIGHT', 'SYSTEM']} value={theme} onSelectedItemChange={ (value) => setTheme(value as 'DARK' | 'LIGHT' | 'SYSTEM')}/>
        </HeaderContainer>
    );
}

const Logo = styled.img`
    height: 33px;
`

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    
    &:hover {
        cursor: pointer;
    }
`

const HeaderContainer = styled.header`
    height: 64px;
    flex-shrink: 0;
    display: flex;
    padding-left: 8em;
    align-items: center;
    padding-right: 8vw;
    justify-content: space-between;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const SearchBar = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 500px;
    margin: 0 auto;
    height: 40px;
    color: ${({ theme }) => theme.labelNormal};
    ${DodamShape.ExtraSmall}
    border: ${({ theme }) => `0.5px solid ${theme.primaryAlternative}`};
    background-color: ${({ theme }) => theme.backgroundNormal};
    padding: 10px;
    text-align: left;
    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.primaryAssistive};
    }
`