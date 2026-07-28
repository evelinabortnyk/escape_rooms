import { Routes, Route } from "react-router-dom";
import Layout from '../layout/Layout'
import Escapes from "../pages/home-page/Escapes";
import Quest from "../pages/quest-page/Quest";
import Contacts from "../pages/contacts-page/Contacts";
import NotFound from "../pages/not-found/NotFound";
import ForBeginners from "../pages/for-beginners-page/ForBeginners";
import Reviews from "../pages/reviews-page/Reviews";
import Promotions from "../pages/promotions-page/promotions";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Escapes />} />
                <Route path="/:title/:id" element={<Quest />} />
                <Route path="/for-beginners" element={<ForBeginners />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            
        </Routes>
    )
}

export default App