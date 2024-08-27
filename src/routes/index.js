import React from "react";
import {Routes, Route} from 'react-router-dom'

const AllRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<div>Homepage</div>} />
        </Routes>
    );
}

export default AllRoutes