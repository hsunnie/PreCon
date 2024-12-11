import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupPage.css';
import { IoIosArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 임포트

const SignupPage = () => {
    const navigate = useNavigate();
    const { setNickname } = useAuth(); // AuthContext에서 setNickname 가져오기

    const [username, setUsername] = useState("");
    const [nickname, setNicknameInput] = useState(""); // 입력 받은 닉네임 상태
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isMarketingAgree, setIsMarketingAgree] = useState(false); // 마케팅 동의 상태 추가

    // 기존 사용자 목록을 가져옴 (로컬 스토리지에서)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 아이디 중복 검사 함수
    const checkUsernameDuplicate = () => {
        if (username.trim() === "") {
            alert("아이디를 입력하세요");
            return;
        }

        setIsCheckingUsername(true);
        const isDuplicate = existingUsers.some(user => user.username === username);
        setIsUsernameValid(!isDuplicate);
        setIsCheckingUsername(false);
    };

    // 회원가입 처리
    const handleSignup = (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!isUsernameValid) {
            alert("사용할 수 없는 아이디입니다.");
            return;
        }

        if (nickname.trim() === "") {
            alert("닉네임을 입력하세요.");
            return;
        }

        const phoneRegex = /^\d{10,11}$/; // 10~11자리 숫자만 허용
        if (!phoneRegex.test(phoneNumber)) {
            alert("유효한 전화번호를 입력하세요. (예: 01012345678)");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 사용자 정보 저장
        const newUser = { username, nickname, phoneNumber, password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // setNickname을 사용하여 전역 상태로 닉네임 설정
        setNickname(nickname);

        // 회원가입 완료 후 축하 페이지로 이동
        navigate("/signup-success");
    };

    return (
        <div className="login-page">
            <div className="top-bar">
                <div onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </div>
                <div className="title">회원가입</div>
            </div>

            <form className="signup-form" onSubmit={handleSignup}>
                {/* 아이디 입력 */}
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUsernameValid(null); // 입력 시 상태 초기화
                        }}
                        placeholder="아이디를 입력하세요"
                        required
                    />
                    <button type="button" onClick={checkUsernameDuplicate}>
                        중복 검사
                    </button>
                    {isUsernameValid === true && (
                        <div style={{ color: "green" }}>사용 가능한 아이디입니다.</div>
                    )}
                    {isUsernameValid === false && (
                        <div style={{ color: "red" }}>이미 사용 중인 아이디입니다.</div>
                    )}
                </div>

                {/* 닉네임 입력 */}
                <div className="form-group">
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNicknameInput(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        required
                    />
                </div>

                {/* 전화번호 입력 */}
                <div className="form-group">
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="전화번호를 입력하세요 (숫자만)"
                        required
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="form-group">
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className="form-group">
                    <div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* 마케팅 수신 동의 */}
                <div className="form-group marketing-agree">
                    <button
                        type="button"
                        className={`marketing-button ${isMarketingAgree ? "checked" : ""}`}
                        onClick={() => setIsMarketingAgree(!isMarketingAgree)}
                    >
                        ✔ 신제품, 이벤트 안내 등 광고성 마케팅 수신 동의 (선택)
                    </button>
                </div>

                {/* 회원가입 버튼 */}
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupPage;
