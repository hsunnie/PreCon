import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccessPage = () => {
    const navigate = useNavigate();

    // 로그인 페이지로 이동
    const handleLoginNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="success-page">
            <h1>회원가입을 축하합니다!</h1>
            <p>이제 로그인 페이지로 이동하여 서비스를 이용하실 수 있습니다.</p>
            <button onClick={handleLoginNavigate}>확인</button>
        </div>
    );
};

export default SignupSuccessPage;
