import React from "react";
import ButtonNav from "../component/Button/ButtonNav";

import '../component/Button/ButtonNav.css'

import { IoSearchOutline } from "react-icons/io5";

const Check = () => {
    return (
        <div className="Check main-content">
            <div>체크하기</div>
            <div>목적지</div>
            <div>
                <IoSearchOutline />
                <input placeholder="어디로 가고 싶으신가요?"/>
            </div>
            <div>선택1</div>
            <div>선택2</div>
            <ButtonNav />
        </div>
    )
}

export default Check