import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: '',
    type: '지출',
    category: '',
    subcategory: '',
    description: '',
    income: '',
    expense: '',
    note: ''
  });

  const totalIncome = transactions.reduce((sum, t) => sum + Number(t.income || 0), 0);
  const totalExpense = transactions.reduce((sum, t) => sum + Number(t.expense || 0), 0);
  const balance = totalIncome - totalExpense;

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTransaction = () => {
    if (!form.date) return alert('날짜를 입력하세요');
    setTransactions([...transactions, form]);
    setForm({
      date: '',
      type: '지출',
      category: '',
      subcategory: '',
      description: '',
      income: '',
      expense: '',
      note: ''
    });
  };

  return (
    <div className="App" style={{ padding: '30px' }}>
      <h2>106하1003 금전출납부</h2>

      {/* 차량 정보 */}
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <strong>🚗 차량명:</strong> The 2025 K5 Lpi 트렌디 6 25MY 에프터마켓 패키지  
        <br />
        <strong>선택사항:</strong> 에프터마켓 패키지(50,000), 썬팅(80,000)
        <br />
        <strong>가격 구성:</strong> 기본가격 25,070,000 + 선택사항 130,000 + 탁송료 236,000 – 할인 1,700,000 = 합계 23,736,000
        <br />
        <strong>보험료 합계:</strong> 978,900
      </div>

      {/* 수입/지출 합계 */}
      <div style={{ marginBottom: '20px' }}>
        <strong>총수입:</strong> {totalIncome.toLocaleString()} 원 /{' '}
        <strong>총지출:</strong> {totalExpense.toLocaleString()} 원 /{' '}
        <strong>잔액:</strong> {balance.toLocaleString()} 원
      </div>

      {/* 입력 폼 */}
      <div style={{ marginBottom: '20px' }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="수입">수입</option>
          <option value="지출">지출</option>
        </select>
        <input name="category" placeholder="대분류" value={form.category} onChange={handleChange} />
        <input name="subcategory" placeholder="소분류" value={form.subcategory} onChange={handleChange} />
        <input name="description" placeholder="적요" value={form.description} onChange={handleChange} />
        <input name="income" type="number" placeholder="수입" value={form.income} onChange={handleChange} />
        <input name="expense" type="number" placeholder="지출" value={form.expense} onChange={handleChange} />
        <input name="note" placeholder="비고" value={form.note} onChange={handleChange} />
        <button onClick={addTransaction}>➕ 추가</button>
      </div>

      {/* 거래 테이블 */}
      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>대분류</th>
            <th>소분류</th>
            <th>적요</th>
            <th>수입</th>
            <th>지출</th>
            <th>잔액</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {transactions.reduce((rows, t, i) => {
            const prevBalance = i === 0 ? 0 : rows[i - 1].balance;
            const newBalance = prevBalance + Number(t.income || 0) - Number(t.expense || 0);
            rows.push({ ...t, balance: newBalance });
            return rows;
          }, []).map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.subcategory}</td>
              <td>{t.description}</td>
              <td>{Number(t.income || 0).toLocaleString()}</td>
              <td>{Number(t.expense || 0).toLocaleString()}</td>
              <td>{t.balance.toLocaleString()}</td>
              <td>{t.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
