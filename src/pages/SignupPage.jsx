import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupPage.css'; // 스타일링을 위한 CSS 파일
import { IoIosArrowBack } from "react-icons/io";

const SignupPage = () => {
    const navigate = useNavigate();
    return (
        <div className="login-page">
        {/* 뒤로가기 버튼 */}
        <div className="top-bar">
            <div onClick={() => { navigate(-1) }}>
                <div className="ioiosarrowback">
                    <IoIosArrowBack />
                </div>
            </div>
            <div className="title">회원가입</div>
        </div>
        </div>
    );
};

export default SignupPage;