import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Check from '../pages/Check';
import Mypage from '../pages/Mypage';
import LoginPage from '../pages/LoginPage'; // LoginPage 컴포넌트 임포트

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/check" element={<Check />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default AllRoutes;
