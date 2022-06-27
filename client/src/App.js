import React from "react";

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home";
import Auth from './Components/Auth/Auth';


const App = () => (
    <BrowserRouter>
        <Container maxidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>

)

export default App;