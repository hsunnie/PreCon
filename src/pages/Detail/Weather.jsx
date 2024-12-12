import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

import "./Weather.css"

const Weather = () => {
    // 쿼리 파라미터를 파싱하는 유틸리티 함수
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery(); // 쿼리 파라미터 가져오기
    const countryQuery = query.get('query'); // query라는 파라미터 값 추출

    const [weather] = useState([
        {
            country:"일본",
            jan_nig:"1",
            jan_day:"2",
            feb_nig:"3",
            feb_day:"4",
            mar_nig:"5",
            mar_day:"6",
            apr_nig:"7",
            apr_day:"8",
            may_nig:"9",
            may_day:"10",
            jun_nig:"11",
            jun_day:"12",
            jul_nig:"13",
            jul_day:"14",
            aug_nig:"15",
            aug_day:"16",
            sep_nig:"17",
            sep_day:"18",
            oct_nig:"19",
            oct_day:"20",
            nov_nig:"21",
            nov_day:"22",
            dec_nig:"23",
            dec_day:"24",
        },
        {
            country:"중국",
            jan_nig:"11",
            jan_day:"22",
            feb_nig:"33",
            feb_day:"44",
            mar_nig:"55",
            mar_day:"66",
            apr_nig:"77",
            apr_day:"88",
            may_nig:"99",
            may_day:"1010",
            jun_nig:"1111",
            jun_day:"1212",
            jul_nig:"1313",
            jul_day:"1414",
            aug_nig:"1515",
            aug_day:"1616",
            sep_nig:"1717",
            sep_day:"1818",
            oct_nig:"1919",
            oct_day:"2020",
            nov_nig:"2121",
            nov_day:"2222",
            dec_nig:"2323",
            dec_day:"2424",
        },
    ]);

    // countryQuery와 일치하는 정보를 찾음
    const selectedWhether = weather.find(whe => whe.country === countryQuery);

    return (
        <div className='weather-container'>
            <h2>월별 평균 기온</h2>
            
            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>1월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.jan_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.jan_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>2월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.feb_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.feb_day : ''}°C</div>
                </div>
            </div>

            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>3월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.mar_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.mar_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>4월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.apr_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.apr_day : ''}°C</div>
                </div>
            </div>

            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>5월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.may_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.may_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>6월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.jun_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.jun_day : ''}°C</div>
                </div>
            </div>

            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>7월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.jul_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.jul_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>8월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.aug_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.aug_day : ''}°C</div>
                </div>
            </div>
            
            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>9월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.sep_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.sep_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>10월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.oct_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.oct_day : ''}°C</div>
                </div>
            </div>
            
            <div className='row-container'>
                <div className='mon-container'>
                    <div className='mon'>11월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.nov_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.nov_day : ''}°C</div>
                </div>
                <div className='mon-container'>
                    <div className='mon'>12월</div>
                    <div className='nig'>최저 {selectedWhether ? selectedWhether.dec_nig : ''}°C</div>
                    <div className='day'>최고 {selectedWhether ? selectedWhether.dec_day : ''}°C</div>
                </div>
            </div>
        </div>
    );
};

export default Weather;