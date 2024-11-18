import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Check from '../pages/Check';
import Mypage from '../pages/Mypage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

import { AuthProvider } from '../contexts/AuthContext';

const AllRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/check" element={<Check />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default AllRoutes;
