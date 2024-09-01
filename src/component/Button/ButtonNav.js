import React from "react";

import './ButtonNav.css'

import { Link, useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";

const ButtonNav = () => {
    const {pathname} = useLocation();
    return (
        <div className="ButtonNav">
            <Link className={pathname === '/' ? 'active' : ''} to={'/'}><span><TiHome /></span><span>홈</span></Link>
            <Link className={pathname === '/search' ? 'active' : ''} to={'/search'}><span><IoSearchOutline /></span><span>검색</span></Link>
            <Link className={pathname === '/check' ? 'active' : ''} to={'/check'}><span><FaRegCalendarCheck /></span><span>체크</span></Link>
            <Link className={pathname === '/mypage' ? 'active' : ''} to={'/mypage'}><span><PiUserCircleFill /></span><span>마이페이지</span></Link>
        </div>
    )
}

export default ButtonNav