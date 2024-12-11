import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState(""); // 닉네임 상태 추가

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, nickname, setNickname }}>
            {children}
        </AuthContext.Provider>
    );
};
