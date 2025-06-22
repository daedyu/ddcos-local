import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {RecoilRoot} from "recoil";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/*리코일 사용*/}
      <RecoilRoot>
          {/*App 호출*/}
          <App />
      </RecoilRoot>
    </StrictMode>,
)
