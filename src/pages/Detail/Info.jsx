import React from 'react';
import { useLocation } from 'react-router-dom';

const Info = () => {
    // 쿼리 파라미터를 파싱하는 유틸리티 함수
    function useQuery() {
        return new URLSearchParams(useLocation().search);
}
    const query = useQuery();
    const countryQuery = query.get("query");
    return (
        <div>
            {countryQuery} 여행 정보
        </div>
    )
}

export default Info