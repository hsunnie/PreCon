import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes';
import './App.css';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <h1>PreCon</h1>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisited', 'true'); // 스플래시 화면을 본 기록을 저장
      }, 15000); // 15초 동안 Splash Screen을 보여줌

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      // useEffect 실행 후 첫 렌더링이 끝난 후에 상태 업데이트
      setTimeout(() => setIsLoading(false), 0);
    }
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
