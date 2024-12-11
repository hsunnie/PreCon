import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import "./Info.css"

const Info = () => {
    // 쿼리 파라미터를 파싱하는 유틸리티 함수
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const countryQuery = query.get("query");

    const [infomations] = useState([
        {
            country: '일본',
            flight: '직항',
            flighttime: '약 2시간 20분',
            timediff: '한국 대비 차이 없음',
            visa: '90일 무비자',
            voltage: '50Hz, 60Hz, 100Hz; 변압기 사용 필수',
            language: '일본어',
            prices: '한국 대비 비쌈',
        },
        {
            country: '한국',
            flight: '국내',
            flighttime: '0분',
            timediff: '차이 없음',
            visa: '무비자',
            voltage: '220',
            language: '한국어',
            prices: '-',
        },
        {
            country: '중국',
            flight: '직항',
            flighttime: '약 2시간 20분',
            timediff: '다양',
            visa: '비자',
            voltage: '변압기 사용 필수',
            language: '중국어',
            prices: '비쌈',
        },
    ]);

    // countryQuery와 일치하는 정보를 찾음
    const selectedInfo = infomations.find(info => info.country === countryQuery);

    return (
        <div className='whole-container'>
            <h2>{countryQuery} 여행 정보</h2>
            {selectedInfo ? (
                <div className='info-container'>
                    <div className='info-box'>
                        <div className='tit'>항공</div>
                        <div>{selectedInfo.flight}</div>
                        <div>{selectedInfo.flighttime}</div>
                    </div>
                    <div className='info-box'>
                        <div className='tit'>시차</div>
                        <div>{selectedInfo.timediff}</div>
                    </div>
                    <div className='info-box'>
                        <div className='tit'>비자</div>
                        <div>{selectedInfo.visa}</div>
                    </div>
                    <div className='info-box'>
                        <div className='tit'>전압</div>
                        <div>{selectedInfo.voltage}</div>
                    </div>
                    <div className='info-box'>
                        <div className='tit'>언어</div>
                        <div>{selectedInfo.language}</div>
                    </div>
                    <div className='info-box'>
                        <div className='tit'>물가</div>
                        <div>{selectedInfo.prices}</div>
                    </div>
                </div>       
            ) : (
                <p>해당 국가의 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default Info;