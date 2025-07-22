import './App.css';
import { useState } from 'react';

function App() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ date: '', type: '입금', amount: '', memo: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.date || !form.amount) return alert("날짜와 금액을 입력해주세요.");
    setRecords([...records, { ...form, amount: parseInt(form.amount, 10) }]);
    setForm({ date: '', type: '입금', amount: '', memo: '' });
  };

  const total = records.reduce((acc, rec) => {
    return rec.type === '입금' ? acc + rec.amount : acc - rec.amount;
  }, 0);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h2>🚗 차량 금전출납부</h2>
      <div style={{ marginBottom: 20 }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="입금">입금</option>
          <option value="출금">출금</option>
        </select>
        <input name="amount" type="number" placeholder="금액" value={form.amount} onChange={handleChange} />
        <input name="memo" placeholder="메모" value={form.memo} onChange={handleChange} />
        <button onClick={handleAdd}>추가</button>
      </div>

      <table border="1" cellPadding="5" style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>금액</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.type}</td>
              <td style={{ color: r.type === '출금' ? 'red' : 'green' }}>{r.amount.toLocaleString()}원</td>
              <td>{r.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>💰 현재 잔액: {total.toLocaleString()} 원</h3>
    </div>
  );
}

export default App;
