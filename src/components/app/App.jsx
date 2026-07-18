import { Routes, Route } from "react-router-dom";
import Layout from '../layout/Layout'
import Escapes from "../pages/home-page/Escapes";
import Quest from "../pages/quest-page/Quest";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Escapes />} />
                <Route path="/:title/:id" element={<Quest />} />
            </Route>
            
        </Routes>
    )
}

export default App