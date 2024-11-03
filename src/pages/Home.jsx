import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNav from "../component/Button/ButtonNav";
import backgroundImage from "../images/beach.jpg";
import SubButton from "../component/Button/SubButton";

import '../component/Button/ButtonNav.css';
import './Home.css';
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

import japanImage from "../images/japan.jpg";
import singaporeImage from "../images/singapore.jpg";
import guamImage from "../images/guam.jpg";
import vietnamImage from "../images/vietnam.jpg";
import taiwanImage from "../images/taiwan.jpg";
import indonesiaImage from "../images/indonesia.jpg";
import chinaImage from "../images/china.jpg";

import mainjapanImage from "../images/mainjapan.jpg";
import mainsingaporeImage from "../images/mainsingapore.jpg";
import mainguamImage from "../images/mainguam.jpg";
import mainvietnamImage from "../images/mainvietnam.jpg";
import maintaiwanImage from "../images/maintaiwan.jpg";
import mainindonesiaImage from "../images/mainindonesia.jpg";
import mainchinaImage from "../images/mainchina.jpg";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

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

    const [countrys, setCountrys] = useState([
        { id: 1, country: '일본', imageUrl: japanImage, safetyIndex: 98, mainImg: mainjapanImage },
        { id: 2, country: '싱가포르', imageUrl: singaporeImage, safetyIndex: 80, mainImg: mainsingaporeImage },
        { id: 3, country: '괌', imageUrl: guamImage, safetyIndex: 55, mainImg: mainguamImage },
        { id: 4, country: '베트남', imageUrl: vietnamImage, safetyIndex: 70, mainImg: mainvietnamImage },
        { id: 5, country: '대만', imageUrl: taiwanImage, safetyIndex: 85, mainImg: maintaiwanImage },
        { id: 6, country: '인도네시아', imageUrl: indonesiaImage, safetyIndex: 60, mainImg: mainindonesiaImage },
        { id: 7, country: '중국', imageUrl: chinaImage, safetyIndex: 30, mainImg: mainchinaImage },
        { id: 11, country: '일본', imageUrl: japanImage, safetyIndex: 98, mainImg: mainjapanImage },
        { id: 12, country: '싱가포르', imageUrl: singaporeImage, safetyIndex: 80, mainImg: mainsingaporeImage },
        { id: 13, country: '괌', imageUrl: guamImage, safetyIndex: 55, mainImg: mainguamImage },
        { id: 14, country: '베트남', imageUrl: vietnamImage, safetyIndex: 70, mainImg: mainvietnamImage },
        { id: 15, country: '대만', imageUrl: taiwanImage, safetyIndex: 85, mainImg: maintaiwanImage },
        { id: 16, country: '인도네시아', imageUrl: indonesiaImage, safetyIndex: 60, mainImg: mainindonesiaImage },
        { id: 17, country: '중국', imageUrl: chinaImage, safetyIndex: 30, mainImg: mainchinaImage },
        { id: 8, country: '일본', imageUrl: japanImage, safetyIndex: 98, mainImg: mainjapanImage },
        { id: 9, country: '싱가포르', imageUrl: singaporeImage, safetyIndex: 80, mainImg: mainsingaporeImage },
        { id: 10, country: '괌', imageUrl: guamImage, safetyIndex: 55, mainImg: mainguamImage },
        { id: 18, country: '베트남', imageUrl: vietnamImage, safetyIndex: 70, mainImg: mainvietnamImage },
        { id: 19, country: '대만', imageUrl: taiwanImage, safetyIndex: 85, mainImg: maintaiwanImage },
        { id: 20, country: '인도네시아', imageUrl: indonesiaImage, safetyIndex: 60, mainImg: mainindonesiaImage },
        { id: 21, country: '중국', imageUrl: chinaImage, safetyIndex: 30, mainImg: mainchinaImage },
        { id: 22, country: '일본', imageUrl: japanImage, safetyIndex: 98, mainImg: mainjapanImage },
        { id: 23, country: '싱가포르', imageUrl: singaporeImage, safetyIndex: 80, mainImg: mainsingaporeImage },
        { id: 24, country: '괌', imageUrl: guamImage, safetyIndex: 55, mainImg: mainguamImage },
        { id: 25, country: '베트남', imageUrl: vietnamImage, safetyIndex: 70, mainImg: mainvietnamImage },
        { id: 26, country: '대만', imageUrl: taiwanImage, safetyIndex: 85, mainImg: maintaiwanImage },
        { id: 27, country: '인도네시아', imageUrl: indonesiaImage, safetyIndex: 60, mainImg: mainindonesiaImage },
        { id: 28, country: '중국', imageUrl: chinaImage, safetyIndex: 30, mainImg: mainchinaImage },
    ]);

   // 상위 6개 항목만 저장할 상태
   const [topSafeCountrys, setTopSafeCountrys] = useState([]);

   useEffect(() => {
       // safetyIndex 기준으로 countrys 배열을 정렬하고 상위 6개만 topSafeCountrys에 저장
       const sortedCountrys = [...countrys].sort((a, b) => b.safetyIndex - a.safetyIndex);
       setTopSafeCountrys(sortedCountrys.slice(0, 6));
   }, [countrys]);

   const handleCountryClick = (country) => {
       navigate(`/search?query=${country}`);
   };

   // 3개씩 묶는 함수
   const getCountryRows = (items) => {
       const rows = [];
       for (let i = 0; i < items.length; i += 3) {
           rows.push(items.slice(i, i + 3));
       }
       return rows;
   };

   return (
       <div className="Home main-content">
           <div className="search-bar" style={{ backgroundImage: `url(${backgroundImage})` }}>
               <div className="search-container">
                   <input
                       type="text"
                       placeholder="어디로 떠나고 싶으세요?"
                       value={searchQuery}
                       onChange={handleSearchChange}
                       onKeyDown={handleKeyDown}
                   />
                   <div className="search-icon" onClick={handleSearchClick}>
                       <IoSearchOutline />
                   </div>
               </div>
           </div>

           {/* 안전한 여행지 섹션 */}
           <div className="recom-safe">
               <div className="recon-safe-title">안전한 여행지</div>
               <div className="country-list">
                   {getCountryRows(topSafeCountrys).map((row, rowIndex) => (
                       <React.Fragment key={rowIndex}>
                           <div className="country-list-row">
                               {row.map((item, index) => (
                                   <SubButton
                                       key={item.id}
                                       imageUrl={item.mainImg}
                                       text={item.country}
                                       number={rowIndex * 3 + index + 1}  // 순서대로 번호 부여
                                       handleClick={() => handleCountryClick(item.country)}  // 클릭 시 URL 이동
                                   />
                               ))}
                           </div>
                           <hr />
                       </React.Fragment>
                   ))}
               </div>
           </div>

           {/* 떠나기 전 알아보기 섹션 */}
           <div className="info-country">
               <div className="info-country-title">떠나기 전 알아보기</div>
               <div className="info-country-list">
                   {countrys.map((item) => (
                       <div key={item.id} className="info-country-item">
                           <img src={item.imageUrl} alt={item.country} className="info-country-image" />
                           <div className="info-country-name">{item.country}</div>
                           <button className="learn-more-button" onClick={() => handleCountryClick(item.country)}>
                               알아보기 <FaArrowRight />
                           </button>
                       </div>
                   ))}
               </div>
           </div>

           <ButtonNav />
       </div>
   );
};

export default Home;