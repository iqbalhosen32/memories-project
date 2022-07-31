import React from "react";

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home";
import Auth from './Components/Auth/Auth';
import PostDetails from "./Components/PostDetails/PostDetails";


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;