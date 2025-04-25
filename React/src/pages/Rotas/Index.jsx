import React from "react";
import Home from "../Home"
import Registro from "../Registro";
import Consentimentos from "../Consentimento";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/Registro" element={<Registro />}></Route>
                <Route path="/Consentimentos" element={<Consentimentos />}></Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;