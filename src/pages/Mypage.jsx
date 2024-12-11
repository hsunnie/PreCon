import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 임포트
import ButtonNav from "../component/Button/ButtonNav";
import './Mypage.css';
import { PiHandWavingBold } from "react-icons/pi";

const Mypage = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { nickname } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // 로그아웃 시 isLoggedIn을 false로 설정
        navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    };

    const handleLoginNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="Mypage main-content">
            {isLoggedIn ? (
                <div>
                    <div className="firstbtn">
                        <PiHandWavingBold />
                        <div>안녕하세요, {nickname}님!</div>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                    <div>최근 본 여행지</div>
                    <hr />
                    <div>설정</div>
                </div>
            ) : (
                <div className="firstbtn">
                    <PiHandWavingBold />
                    <div className="hello">헬로우!</div>
                    <button className="loginbtn" onClick={handleLoginNavigate}>로그인</button>
                </div>
            )}
            <ButtonNav />
        </div>
    );
};

export default Mypage;
