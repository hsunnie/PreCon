import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonNav from "../component/Button/ButtonNav";
import '../component/Button/ButtonNav.css';
import './Check.css';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/locale'; // 달력 한국어로 나타내도록 함

const Check = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [stayDuration, setStayDuration] = useState(""); // 날짜 차이 결과 저장
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
    const [filteredItems, setFilteredItems] = useState([]); // 필터된 추천 항목
    const [isListVisible, setIsListVisible] = useState(false); // 추천 리스트 보임 여부 관리
    const [selectedContainers, setSelectedContainers] = useState({ container1: null, container2: null });

    const handleClick = (container, value) => {
        setSelectedContainers(prev => ({
            ...prev,
            [container]: prev[container] === value ? null : value // 선택된 값이 같으면 해제, 다르면 선택
        }));
    };

    const items = ['미국', '베트남', '태국', '아프리카', '중국', '일본']; // 추천 리스트

    // 검색어가 변경될 때마다 필터링
    useEffect(() => {
        if (searchTerm) {
            const filtered = items.filter(item => item.includes(searchTerm)); // 입력된 검색어를 포함하는 항목만 필터링
            setFilteredItems(filtered);
            setIsListVisible(true); // 검색어가 있으면 리스트 보이기
        } else {
            setFilteredItems([]);
            setIsListVisible(false); // 검색어가 없으면 리스트 숨기기
        }
    }, [searchTerm]);

    // 입력 필드 값이 변경될 때 호출
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 추천 항목 클릭 시 호출
    const handleItemClick = (item) => {
        setSearchTerm(item); // 선택된 나라를 입력 필드에 설정
        setIsListVisible(false); // 리스트 숨기기
    };

    // 엔터 키 입력 시 호출
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (filteredItems.length > 0) {
                setSearchTerm(filteredItems[0]); // 첫 번째 추천 항목 선택
            }
            setIsListVisible(false); // 리스트 숨기기
        }
    };

    // 날짜 변경 시 호출되는 함수
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // 날짜 차이 계산 (start와 end가 모두 선택된 경우에만)
        if (start && end) {
            const timeDiff = Math.abs(end.getTime() - start.getTime()); // 밀리초 차이
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 일 단위로 변환
            setStayDuration(`${dayDiff - 1}박 ${dayDiff}일`); // "2박 3일" 형식으로 설정
        } else {
            setStayDuration(""); // 날짜가 없으면 초기화
        }
    };

    const [selectactivity, setSelectActivity] = useState(false); // 새로운 상태 추가
    const handleActiviryPageClick = () => {
        if (selectedContainers.container1 && selectedContainers.container2) {
            setSelectActivity(true); // 액티비티 & 목록 페이지로 전환
        }
    };

    if (selectactivity) {
        return (
            <div>
                <div onClick={() => { navigate(-1) }}>
                    <IoIosArrowBack className="ioiosarrowback" />
                </div>
                <div>선택하기이이이이이ㅣ</div>
                <ButtonNav />
            </div>
        );
    }

    return (
        <div className="Check main-content">
            <div>체크하기</div>
            <div>목적지</div>
            <div>
                <IoSearchOutline />
                <input
                    type="text"
                    id="name"
                    placeholder="어디로 가고 싶으신가요?"
                    value={searchTerm} // 입력 필드의 값을 상태로 설정
                    onChange={handleInputChange} // 입력 값이 변경될 때 호출
                    onKeyPress={handleKeyPress} // 엔터 키 입력 시 호출
                />
                {/* 추천 항목 리스트 */}
                {isListVisible && filteredItems.length > 0 && (
                    <div className="recom-menu">
                        <div className="recom-items">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="item"
                                    onClick={() => handleItemClick(item)} // 항목 클릭 시 호출
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="date-designate">
                <DatePicker
                    className="date"
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    dateFormat="yy.MM.dd"
                    placeholderText="날짜 범위를 선택하세요"
                    locale={ko}
                />
            </div>

            {/* 날짜 범위 선택 후 계산된 "2박 3일" 표시 */}
            {stayDuration && (
                <div className="stay-duration">
                    {stayDuration}
                </div>
            )}

            <div className="container">
                <div 
                    className={`box non-click ${selectedContainers.container1 === 'female' ? "click" : ""}`} 
                    onClick={() => handleClick('container1', 'female')}
                >
                    여성
                </div>
                <div 
                    className={`box non-click ${selectedContainers.container1 === 'male' ? "click" : ""}`} 
                    onClick={() => handleClick('container1', 'male')}
                >
                    남성
                </div>
            </div>
            <div className="container2">
                <div 
                    className={`box non-click ${selectedContainers.container2 === 'business' ? "click" : ""}`} 
                    onClick={() => handleClick('container2', 'business')}
                >
                    업무
                </div>
                <div 
                    className={`box non-click ${selectedContainers.container2 === 'vacation' ? "click" : ""}`} 
                    onClick={() => handleClick('container2', 'vacation')}
                >
                    휴가
                </div>
            </div>
            <div onClick={handleActiviryPageClick}>액티비티 & 목록 선택하기</div>
            <ButtonNav />
        </div>
    );
};

export default Check;
