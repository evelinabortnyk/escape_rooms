import { Routes, Route } from "react-router-dom";
import Layout from '../layout/Layout'
import Escapes from "../pages/home-page/Escapes";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Escapes />} />
                {/* <Route path="converter" element={<Converter />} /> */}
            </Route>
            
        </Routes>
    )
}

export default App