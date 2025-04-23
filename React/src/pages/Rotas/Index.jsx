import React from "react";
import Home from "../Home"
import Registro from "../Registro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/Registro" element={<Registro />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;