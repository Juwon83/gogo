import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 상단 차량 정보 박스 */}
      <div style={{
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '16px',
        margin: '16px auto',
        width: '90%',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '10px' }}>106하1005 금전출납부</h2>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
          차량명: The 2025 K5 Lpi 트렌디 25MY
        </div>
        <div style={{ fontSize: '16px' }}>
          기본가격: 25,070,000원
        </div>
      </div>

      <p>여기에 수입 지출표와 입력 폼이 들어갈 예정입니다.</p>
    </div>
  );
}

export default App;
