import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import ButtonNav from "../component/Button/ButtonNav";
import '../component/Button/ButtonNav.css';
import './Mypage.css';
import { PiHandWavingBold } from "react-icons/pi";

const Mypage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 생성

    const handleLogout = () => setIsLoggedIn(false);

    const handleLoginNavigate = () => {
        navigate("/login"); // 로그인 페이지로 이동
    };

    return (
        <div className="Mypage main-content">
            {isLoggedIn ? (
                <div>
                    <div className="firstbtn">
                        <PiHandWavingBold />
                        <div>안녕하세요!</div>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                    <div>최근 본 여행지</div>
                    <hr />
                    <div>설정</div>
                </div>
            ) : (
                <div className="firstbtn">
                    <PiHandWavingBold />
                    <div>헬로우</div>
                    <button onClick={handleLoginNavigate}>로그인</button> {/* 클릭 시 로그인 페이지로 이동 */}
                </div>
            )}
            <ButtonNav />
        </div>
    );
};

export default Mypage;
