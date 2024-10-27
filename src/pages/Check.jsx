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
    const [addcheckpage, setAddCheckPage] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
    const [filteredItems, setFilteredItems] = useState([]); // 필터된 추천 항목
    const [isListVisible, setIsListVisible] = useState(false); // 추천 리스트 보임 여부 관리
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [stayDuration, setStayDuration] = useState(""); // 날짜 차이 결과 저장
    const [selectedContainers, setSelectedContainers] = useState({ container1: null, container2: null });
    const [checklists, setChecklists] = useState([]); // 체크리스트 항목 저장

    const items = ['미국', '베트남', '태국', '아프리카', '중국', '일본']; // 추천 리스트

    // 검색어가 변경될 때마다 필터링
    useEffect(() => {
        if (searchTerm) {
            const filtered = items.filter(item => item.includes(searchTerm));
            setFilteredItems(filtered);
            setIsListVisible(true); // 검색어가 있으면 리스트 보이기
        } else {
            setFilteredItems([]);
            setIsListVisible(false); // 검색어가 없으면 리스트 숨기기
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (filteredItems.length > 0) {
                setSearchTerm(filteredItems[0]); // 첫 번째 추천 항목 선택
            }
            setIsListVisible(false); // 리스트 숨기기
        }
    };

    const handleItemClick = (item) => {
        setSearchTerm(item); // 선택된 나라를 입력 필드에 설정
        setIsListVisible(false); // 리스트 숨기기
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const timeDiff = Math.abs(end.getTime() - start.getTime());
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setStayDuration(`${dayDiff - 1}박 ${dayDiff}일`); // "2박 3일" 형식으로 설정
        } else {
            setStayDuration(""); // 날짜가 없으면 초기화
        }
    };

    const handleClick = (container, value) => {
        setSelectedContainers(prev => ({
            ...prev,
            [container]: prev[container] === value ? null : value // 선택된 값이 같으면 해제, 다르면 선택
        }));
    };

    const handleAddCheckPage = () => {
        setAddCheckPage(true); // 체크하기 추가 페이지로 전환
    };

    const [selectactivity, setSelectActivity] = useState(false); // 새로운 상태 추가
    const handleActiviryPageClick = () => {
        if (selectedContainers.container1 && selectedContainers.container2) {
            setAddCheckPage(false); // addcheckpage를 false로 설정
            setSelectActivity(true); // 액티비티 & 목록 페이지로 전환
        }
    };

    const handleCheckListPageClick = () => {
        if (searchTerm && startDate && selectedContainers.container1 && selectedContainers.container2) {
            const newChecklist = {
                destination: searchTerm,
                date: startDate,
                category: `${selectedContainers.container1 === 'female' ? '여성' : '남성'}/${selectedContainers.container2 === 'vacation' ? '휴가' : '업무'}`,
            };
            setChecklists(prev => [...prev, newChecklist]); // 새로운 체크리스트 항목 추가
            setSelectActivity(false); // selectactivity를 false로 설정
        }
    };

    // 월을 추출하는 함수
    const getMonthFromDate = (date) => {
        if (!date) return '';
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        return `${month}월`;
    };

    if (addcheckpage) {
        return (
            <div className="checkbar-container2">
                <div className="checkbar">
                    <IoIosArrowBack className="ioiosarrowback" />
                    <div className="check-title">체크하기</div>
                </div>
                <div>
                    <div>목적지</div>
                    <div>
                        <IoSearchOutline />
                        <input
                            type="text"
                            id="name"
                            placeholder="어디로 가고 싶으신가요?"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {isListVisible && filteredItems.length > 0 && (
                            <div className="recom-menu">
                                <div className="recom-items">
                                    {filteredItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="item"
                                            onClick={() => handleItemClick(item)}
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
                    <div className="btn-container">
                        <div className="activityselectbtn" onClick={handleActiviryPageClick}>액티비티 & 목록 선택하기</div>
                    </div>
                </div>            
                <ButtonNav />
            </div>
        );
    }

    if (selectactivity) {
        return (
            <div>
                <div className="checkbar" onClick={() => { navigate(-1) }}>
                    <IoIosArrowBack className="ioiosarrowback" />
                    <div className="check-title">액티비티 & 목록 선택하기</div>
                </div>
                <div>숙소</div>
                <div>교통 수단</div>
                <div>액티비티 / 아이템</div>
                <div className="btn-container">
                    <div className="activityselectbtn" onClick={handleCheckListPageClick}>체크리스트 만들기</div>
                </div>
                <ButtonNav />
            </div>
        );
    }

    return (
        <div className="check">
            <div className="checkbar-container">
                <div className="checkbar1">여행목록</div>
                <div className="check-add" onClick={handleAddCheckPage}>+</div>
            </div>
            <div className="checklist-container">
                {checklists.map((item, index) => (
                    <div key={index} className="checklist-item">
                        <div>{item.destination}</div>
                        <div>{getMonthFromDate(item.date)}</div>
                        <hr />
                    </div>
                ))}
            </div>
            <ButtonNav />
        </div>
    );
};

export default Check;
