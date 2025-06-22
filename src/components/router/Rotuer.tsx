import {Navigate, Route, Routes} from "react-router-dom";
import DocPage from "../../pages/DocPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/index" replace />} />
            <Route path="*" element={<DocPage/>} />
        </Routes>
    )
}