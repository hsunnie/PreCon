import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './LoginPage.css';
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    // 로그인 검증 함수
    const handleLogin = (e) => {
        e.preventDefault();

        // 로컬 스토리지에서 사용자 목록 불러오기
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === id && user.password === password);

        if (user) {
            setIsLoggedIn(true);
            navigate("/mypage");
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <div className="login-page">
            <div className="top-bar">
                {/* <div className="ioiosarrowback" onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </div> */}
                <div className="title">PreCon</div>
            </div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
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
                    <button type="submit">로그인</button>
                </form>
            </div>

            <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
    );
};

export default LoginPage;
