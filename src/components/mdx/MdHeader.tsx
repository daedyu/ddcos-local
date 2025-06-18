import styled from "styled-components";
import {resolvedThemeSelector} from "../../store/theme/theme.store";
import {useRecoilValue} from "recoil";

export function MdHeader() {
  const themeType = useRecoilValue(resolvedThemeSelector);

  if (themeType === 'DARK') return <HeaderContent src="/b1ndDark.png"/>
  return <HeaderContent src="/b1ndLight.png"/>
}

const HeaderContent = styled.img`
    width: 80%;
    margin-left: 0 !important;
`