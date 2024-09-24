import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Check from '../pages/Check';
import Mypage from '../pages/Mypage';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/check" element={<Check />} />
            <Route path="/mypage" element={<Mypage />} />
        </Routes>
    );
}

export default AllRoutes;
