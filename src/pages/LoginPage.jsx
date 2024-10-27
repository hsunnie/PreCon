import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'; // 스타일링을 위한 CSS 파일
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {
    const [id, setId] = useState(''); // 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const navigate = useNavigate();

    // 회원가입 페이지로 이동
    const handleSignUpNavigate = () => {
        navigate("/signup");
    };

    // 로그인 검증 및 페이지 이동 함수
    const handleLogin = (e) => {
        e.preventDefault();

        // 임의의 로그인 정보 검증 (id: "user123", password: "password")
        if (id === "user123" && password === "password") {
            navigate("/mypage"); // 로그인 성공 시 /mypage로 이동
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다."); // 실패 메시지
        }
    };

    return (
        <div className="login-page">
            {/* 뒤로가기 버튼 */}
            <div onClick={() => navigate(-1)}>
                <IoIosArrowBack className="ioiosarrowback" />
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        name="id"
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={(e) => setId(e.target.value)} // 아이디 입력 핸들러
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
                    />
                </div>
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
