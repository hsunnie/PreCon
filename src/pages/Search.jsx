import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ButtonNav from "../component/Button/ButtonNav";
import './Search.css';
import '../component/Button/ButtonNav.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { IoIosArrowDown } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';

import Info from "./Detail/Info"
import Weather from "./Detail/Weather"
import Exrate from "./Detail/Exrate"
import Event from "./Detail/Event"
import Disease from "./Detail/Disease"
import Crime from "./Detail/Crime"

// 더미 데이터 예시 (나라별 소제목, 이미지, 내용 포함)
const travelData = {
    "동아시아": [
        {
            소분류: "대한민국",
            소제목: "한국의 아름다운 풍경",
            이미지: "https://images.squarespace-cdn.com/content/v1/586ebc34d482e9c69268b69a/1624386887478-9Z3XA27D8WFVDWKW00QS/20201230173806551_JRT8E1VC.png",
            내용: "한국은 사계절이 뚜렷하며, 다양한 문화와 음식을 경험할 수 있습니다. 서울, 부산과 같은 도시뿐만 아니라 한라산, 설악산 등 자연 경관도 아름답습니다."
        },
        {
            소분류: "일본",
            소제목: "일본의 전통과 현대의 조화",
            이미지: "https://media.istockphoto.com/id/876560704/ko/%EC%82%AC%EC%A7%84/%EB%B4%84%EC%97%90%EC%84%9C-%EC%9D%BC%EB%B3%B8-%ED%9B%84-%EC%A7%80.jpg?s=612x612&w=0&k=20&c=NDCk03y7WDrv1TsQdyY_2biW5ejOJIlYIl-d8zj9rqU=",
            내용: "일본은 독특한 전통과 현대 문화를 동시에 느낄 수 있는 나라입니다. 도쿄, 오사카 등의 도시와 교토의 고전적인 매력이 조화를 이룹니다."
        },
        {
            소분류: "중국",
            소제목: "중국의 유구한 역사와 문화",
            이미지: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDaOP27AtzehbHcceB6-16C6HTjPU3VVuDCQ&s",
            내용: "중국은 세계에서 가장 긴 역사를 자랑하는 나라로, 만리장성, 자금성 등 역사적 유적지가 풍부합니다."
        }
    ],
    "동남아시아": [
        {
            소분류: "베트남",
            소제목: "베트남의 길거리 음식과 아름다운 해변",
            이미지: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94bNwKvgSWL8LWyktyRNU65v9hH0i5IVlhg&s",
            내용: "베트남은 풍부한 음식 문화와 아름다운 자연 경관을 자랑합니다. 하롱베이와 다낭은 필수 여행지입니다."
        },
        {
            소분류: "인도네시아",
            소제목: "발리의 휴양과 자연",
            이미지: "https://media.istockphoto.com/id/500798563/ko/%EC%82%AC%EC%A7%84/city-skyline-at-sunset-jakarta-indonesia.jpg?s=612x612&w=0&k=20&c=hJEcIE2rhyTunvYQTv8JbSWvBohikWSSekgyQ5_57IE=",
            내용: "인도네시아는 수천 개의 섬으로 이루어진 나라로, 특히 발리는 휴양지로 유명합니다."
        },
        {
            소분류: "태국",
            소제목: "태국의 황금 사원과 맑은 바다",
            이미지: "https://media.istockphoto.com/id/665699532/ko/%EC%82%AC%EC%A7%84/%ED%83%9C%EA%B5%AD-%EC%9C%A0%EB%84%A4%EC%8A%A4%EC%BD%94-%EC%84%B8%EA%B3%84%EB%AC%B8%ED%99%94%EC%9C%A0%EC%82%B0%EC%9D%B8-%EC%88%98%ED%98%B8%ED%83%80%EC%9D%B4-%EC%97%AD%EC%82%AC%EA%B3%B5%EC%9B%90-%EA%B5%AC%EC%97%AD%EC%97%90-%EC%9E%88%EB%8A%94-%EC%99%93-%EB%A7%88%ED%95%98%ED%85%8C-%EC%82%AC%EC%9B%90.jpg?s=612x612&w=0&k=20&c=gCMS3FBW57yj5JsUbr9rC3OCo1-gwPq7LUQo0lgOyCs=",
            내용: "태국은 방콕의 황금 사원과 푸켓의 맑은 바다로 잘 알려져 있습니다."
        }
    ],
    "남유럽": [
        {
            소분류: "스페인",
            소제목: "스페인의 플라멩코와 맛있는 타파스",
            이미지: "https://media.istockphoto.com/id/1363152959/ko/%EC%82%AC%EC%A7%84/%EC%95%8C%EB%A6%AC%EC%B9%B8%ED%85%8C%EC%9D%98-%EC%B9%BC%ED%8E%98%EC%9D%98-%EA%B1%B0%EB%A6%AC%EC%97%90%EC%84%9C-%EC%8A%A4%ED%8E%98%EC%9D%B8%EC%9D%98-%EA%B5%AD%EA%B8%B0%EB%A1%9C-%EA%B7%B8%EB%A0%A4%EC%A7%84-%EA%B3%84%EB%8B%A8.jpg?s=612x612&w=0&k=20&c=5S4zG1ZJlMjwPIgABqI9f85KmcyzPmxr3-yWRKBkUfA=",
            내용: "스페인은 플라멩코 춤과 타파스 음식으로 유명하며, 바르셀로나와 마드리드는 주요 관광 도시입니다."
        },
        {
            소분류: "이탈리아",
            소제목: "이탈리아의 예술과 미식",
            이미지: "https://media.istockphoto.com/id/539115110/ko/%EC%82%AC%EC%A7%84/colosseum-%EB%A1%9C%EB%A7%88-%EC%9D%B4%ED%83%88%EB%A6%AC%EC%95%84-%EB%B0%8F-%EC%95%84%EC%B9%A8%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%9D%BC%EC%9A%94%EC%9D%BC.jpg?s=612x612&w=0&k=20&c=hso8BF2S-vijOncK0d-ZJwmbPOCPC2t8aJgAlosdPYc=",
            내용: "이탈리아는 예술과 요리의 나라로, 로마, 피렌체, 베네치아는 필수 방문 도시입니다."
        }
    ],
    "북유럽": [
        {
            소분류: "덴마크",
            소제목: "덴마크의 평화로운 도시",
            이미지: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbwucFybp_h5kbPqAvxYMtdZIM9-IchfeWqg&s",
            내용: "덴마크는 코펜하겐과 같은 아름다운 도시와 북유럽 특유의 평화로운 분위기를 제공합니다."
        },
        {
            소분류: "노르웨이",
            소제목: "노르웨이의 피오르드와 자연",
            이미지: "https://media.istockphoto.com/id/948305492/ko/%EC%82%AC%EC%A7%84/%EB%B2%A0-%EB%A5%B4-%EA%B2%90-%EB%85%B8%EB%A5%B4%EC%9B%A8%EC%9D%B4%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A0-%EB%A5%B4-%EA%B2%90-%EB%85%B8%EB%A5%B4%EC%9B%A8%EC%9D%B4%EC%97%90%EC%84%9C-bryggen-%ED%95%9C%EC%9E%90-%EB%B6%80%EB%91%90%EC%97%90-%EC%97%AD%EC%82%AC%EC%A0%81%EC%9D%B8-%EA%B1%B4%EB%AC%BC%EC%9D%98-%EC%A0%84%EB%A7%9D-%EC%9C%A0%EB%84%A4%EC%8A%A4%EC%BD%94-%EC%84%B8%EA%B3%84-%EC%9C%A0%EC%82%B0-%EC%82%AC%EC%9D%B4%ED%8A%B8.jpg?s=612x612&w=0&k=20&c=_w_J18cpgMWnwgAMAzhmdlDoXT3wdzRqohNidCxhYq0=",
            내용: "노르웨이는 놀라운 자연 경관을 자랑하며, 피오르드는 특히 유명합니다."
        }
    ],
    "북아메리카": [
        {
            소분류: "미국",
            소제목: "미국의 다채로운 문화와 자연",
            이미지: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoZfiHRo3FpUwF0ldBiJhWCInIaTXKNi7DQ&s",
            내용: "미국은 뉴욕, LA와 같은 대도시뿐만 아니라 그랜드캐니언과 같은 자연 경관도 자랑합니다."
        },
        {
            소분류: "멕시코",
            소제목: "멕시코의 맛있는 음식과 역사",
            이미지: "https://media.istockphoto.com/id/1277297248/ko/%EC%82%AC%EC%A7%84/%EB%A9%95%EC%8B%9C%EC%BD%94%EC%97%90%EC%84%9C-%EC%B6%A4%EC%B6%94%EB%8A%94-%EB%AF%BC%EC%86%8D-%EB%AC%B4%EC%9A%A9%EC%88%98%EB%93%A4%EC%9D%98-%EC%82%AC%EC%A7%84-%EB%A9%95%EC%8B%9C%EC%BD%94-%EB%AC%B8%ED%99%94%EC%99%80-%EC%A0%84%ED%86%B5.jpg?s=612x612&w=0&k=20&c=vv1th4p0ttfcsXjKVSr4MMNP6H9e-AekcKkUs1_RYmM=",
            내용: "멕시코는 맛있는 음식과 유구한 역사를 자랑하며, 칸쿤의 아름다운 해변도 인기 있습니다."
        }
    ],
    "남아메리카": [
        {
            소분류: "칠레",
            소제목: "칠레의 드넓은 자연",
            이미지: "https://media.istockphoto.com/id/1095456230/ko/%EC%82%AC%EC%A7%84/%ED%94%8C%EB%9D%BC%EC%9E%90-%EB%93%9C-%EB%AC%B4%EA%B8%B0-%EA%B4%91%EC%9E%A5%EA%B3%BC-%EC%84%9D%EC%96%91-%EC%82%B0%ED%8B%B0%EC%95%84%EA%B3%A0-%EC%B9%A0%EB%A0%88-%EC%82%B0%ED%8B%B0%EC%95%84%EA%B3%A0-%EB%A9%94%ED%8A%B8%EB%A1%9C%ED%8F%B4%EB%A6%AC%ED%83%84-%EC%84%B1%EB%8B%B9.jpg?s=612x612&w=0&k=20&c=YJSz0gWLzlSzhPhWurMJLoMnbiCBWIPmMPLQBz6AZ1g=",
            내용: "칠레는 안데스 산맥과 파타고니아 등 다양한 자연 경관을 제공합니다."
        },
        {
            소분류: "브라질",
            소제목: "브라질의 삼바와 축제",
            이미지: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1x_cam3Z9K38ePf3AxKK0nQhGg4MAPClnMQ&s",
            내용: "브라질은 리우 카니발과 같은 축제로 잘 알려져 있으며, 열정적인 문화가 매력적입니다."
        }
    ],
    "기타": [
        {
            소분류: "뉴질랜드",
            소제목: "뉴질랜드의 모험과 자연",
            이미지: "https://media.istockphoto.com/id/1415070790/ko/%EC%82%AC%EC%A7%84/%EC%99%80%EB%82%98%EC%B9%B4-%ED%98%B8%EC%88%98%EC%99%80-%EC%95%BC%EC%8B%AC-%EC%B0%AC-%EA%B5%AD%EB%A6%BD-%EA%B3%B5%EC%9B%90%EC%9D%98-%EB%A9%8B%EC%A7%84-%EA%B2%BD%EC%B9%98-%EC%A0%84%EB%A7%9D.jpg?s=612x612&w=0&k=20&c=QjhLS2IhDfqZpwRwiOL5UvVhrLW897CPsJILbBvrJio=",
            내용: "뉴질랜드는 모험을 즐기기 좋은 나라로, 아름다운 자연을 자랑합니다."
        }
    ]
};

// 쿼리 파라미터를 파싱하는 유틸리티 함수
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const query = useQuery();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [isTravelReadyPage, setIsTravelReadyPage] = useState(false); // 새로운 상태 추가

    const countryQuery = query.get("query");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSubCategoryClick = (subCategory) => {
        navigate(`/search?query=${subCategory}`);  
    };

    const handlePrepareTravelClick = () => {
        setIsTravelReadyPage(true); // 여행 준비하기 페이지로 전환
    };

    const [menuPage, setMenuPage] = useState(0);

    if (isTravelReadyPage) {
        return (
            <div className="prepare-travel-page">
                <div onClick={() => { navigate(-1) }}>
                    <div className="ioiosarrowback"><IoIosArrowBack /></div>
                </div>
                <div className="query-result-text">
                        {countryQuery} 알아보기
                </div>
                <hr />
                <div className="sububtton-bar">
                    <div className={menuPage===0 ? 'active':''} onClick={()=>{setMenuPage(0);}}>여행 정보</div>
                    <div className={menuPage===1 ? 'active':''} onClick={()=>{setMenuPage(1);}}>날씨</div>
                    <div className={menuPage===2 ? 'active':''} onClick={()=>{setMenuPage(2);}}>환율</div>
                    <div className={menuPage===3 ? 'active':''} onClick={()=>{setMenuPage(3);}}>행사</div>
                    <div className={menuPage===4 ? 'active':''} onClick={()=>{setMenuPage(4);}}>질병</div>
                    <div className={menuPage===5 ? 'active':''} onClick={()=>{setMenuPage(5);}}>범죄</div>
                </div>
                {menuPage===0 ? <Info />:
                menuPage===1 ? <Weather /> :
                menuPage===2 ? <Exrate /> :
                menuPage===3 ? <Event /> :
                menuPage===4 ? <Disease /> :
                <Crime />
                }
                {/* <button onClick={() => setIsTravelReadyPage(false)}>뒤로 가기</button> */}
                <ButtonNav />
            </div>
        );
    }

    return (
        <div className={`Search main-content2 ${countryQuery ? "search-query-exist" : "search-query-empty"}`}>
            <div className="search-bar2">
                <div onClick={() => { navigate(-1) }}>
                    <div className="ioiosarrowback"><IoIosArrowBack /></div>
                </div>

                {!countryQuery ? (
                    <div className="country-search-bar">
                        <input 
                            className={`search-place ${countryQuery ? "search-query-exist" : "search-query-empty"}`}
                            placeholder="국가명을 검색해 보세요"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                        <div onClick={handleSearchClick}>
                            <IoSearchOutline />
                        </div>
                    </div>
                ) : (
                    <div className="query-result-text">
                        {countryQuery} 알아보기
                    </div>
                )}
            </div>

            {!countryQuery && (
                    <div className="date-picker-container">
                        <DatePicker
                        className="date"
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        dateFormat="yy.MM.dd"
                        placeholderText="날짜 범위를 선택하세요"
                        locale={ko}
                        />
                        <IoIosArrowDown />
                    </div>
            )}

            {!countryQuery && (
                <div className="category-container">
                    <div className="category-list"><div className="cat-list-top">여행지 목록</div><hr className="cat-top-hr"/>
                        {Object.keys(travelData).map((category) => (
                            <div 
                                key={category} 
                                className={`category ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>

                    <div className="subcategory-list">
                        {selectedCategory && (
                            <div>
                                {travelData[selectedCategory].map((sub) => (
                                    <div 
                                        key={sub.소분류}
                                        className="subcategory"
                                        onClick={() => handleSubCategoryClick(sub.소분류)}
                                    >
                                        {sub.소분류}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {countryQuery && (
                <div>
                    {Object.values(travelData).flat().filter(item => item.소분류 === countryQuery).map(item => (
                        <div key={item.소분류}>
                            <img src={item.이미지} alt={item.소분류} className="country-image" />
                            <div className="sub-title-content">{item.소제목}</div>
                            <p className="sub-content">{item.내용}</p>
                            <div 
                                className="blue-btn" 
                                onClick={handlePrepareTravelClick}  // 여행 준비하기 버튼 클릭 시 상태 변경
                            >
                                여행 준비하기
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ButtonNav />
        </div>
    );
};

export default Search;