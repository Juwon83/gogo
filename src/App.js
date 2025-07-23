import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', type: '수입', amount: '', note: '' });

  // Load from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem('ledger');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when entries change
  useEffect(() => {
    localStorage.setItem('ledger', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.date || !form.amount) {
      alert('날짜와 금액을 입력해 주세요.');
      return;
    }
    const newEntry = { ...form, id: Date.now() };
    setEntries([...entries, newEntry]);
    setForm({ date: '', type: '수입', amount: '', note: '' });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="App">
      <h1>🚗 차량 금전출납부</h1>
      <div style={{ marginBottom: '20px' }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="수입">수입</option>
          <option value="지출">지출</option>
        </select>
        <input name="amount" type="number" placeholder="금액" value={form.amount} onChange={handleChange} />
        <input name="note" type="text" placeholder="비고" value={form.note} onChange={handleChange} />
        <button onClick={handleAdd}>추가</button>
      </div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>금액</th>
            <th>비고</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.type}</td>
              <td>{parseInt(e.amount).toLocaleString()}원</td>
              <td>{e.note}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
