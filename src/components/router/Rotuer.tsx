import {Route, Routes} from "react-router-dom";
import DocPage from "../../pages/DocPage";

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<DocPage/>} />
        </Routes>
    )
}