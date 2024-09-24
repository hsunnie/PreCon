import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";

import './ButtonNav.css';

const ButtonNav = () => {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const handleSearchClick = (e) => {
        // /search에 쿼리 파라미터가 있을 경우 제거 후 이동 및 새로고침
        if (search) {
            e.preventDefault(); // 기본 링크 이동 동작을 막음
            navigate('/search', { replace: true }); // 쿼리 파라미터 없이 /search로 이동
            setTimeout(() => {
                window.location.reload(); // 페이지를 새로고침
            }, 0); // 바로 새로고침
        }
    };

    return (
        <div className="ButtonNav">
            <Link className={pathname === '/' ? 'active' : ''} to={'/'}>
                <span><TiHome /></span><span>홈</span>
            </Link>
            {/* 검색 버튼 클릭 시 handleSearchClick 실행 */}
            <Link
                className={pathname === '/search' ? 'active' : ''}
                onClick={handleSearchClick}
                to={'/search'}
            >
                <span><IoSearchOutline /></span><span>검색</span>
            </Link>
            <Link className={pathname === '/check' ? 'active' : ''} to={'/check'}>
                <span><FaRegCalendarCheck /></span><span>체크</span>
            </Link>
            <Link className={pathname === '/mypage' ? 'active' : ''} to={'/mypage'}>
                <span><PiUserCircleFill /></span><span>마이페이지</span>
            </Link>
        </div>
    );
}

export default ButtonNav;
