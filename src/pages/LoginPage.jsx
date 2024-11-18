import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 임포트
import './LoginPage.css';
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth(); // setIsLoggedIn 가져오기

    // 회원가입 페이지로 이동
    const handleSignUpNavigate = () => {
        navigate("/signup");
    };

    // 로그인 검증 및 페이지 이동 함수
    const handleLogin = (e) => {
        e.preventDefault();

        // 임의의 로그인 정보 검증 (id: "user123", password: "password")
        if (id === "user123" && password === "password") {
            setIsLoggedIn(true); // 로그인 상태를 true로 변경
            navigate("/mypage"); // 로그인 성공 시 /mypage로 이동
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <div className="login-page">
            <div className="top-bar">
                <div onClick={() => { navigate(-1) }}>
                    <div className="ioiosarrowback">
                        <IoIosArrowBack />
                    </div>
                </div>
                <div className="title">로그인</div>
            </div>
            
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">로그인</button>
            </form>
            <div className="additional-options">
                <button className="find-account-button">회원정보 찾기</button>
                <button onClick={handleSignUpNavigate} className="sign-up-button">회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;
