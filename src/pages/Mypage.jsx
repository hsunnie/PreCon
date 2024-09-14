import React from "react";
import ButtonNav from "../component/Button/ButtonNav";

import '../component/Button/ButtonNav.css'

const Mypage = () => {
    return (
        <div className="Mypage main-content">
            <div>헬로우</div>
            <div>최근 본 여행지</div>
            <hr />
            <div>설정</div>
            <ButtonNav />
        </div>
    )
}

export default Mypage