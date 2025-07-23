import { useState, useEffect } from 'react';

function App() {
  const [vehicle, setVehicle] = useState({
    number: '106하1005',
    name: 'The 2025 K5 Lpi 트렌디 25MY',
    price: 25070000
  });
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ date: '', description: '', amount: '', type: 'income' });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...form,
      amount: parseInt(form.amount),
      id: Date.now(),
    };
    setTransactions([...transactions, newTransaction]);
    setForm({ date: '', description: '', amount: '', type: 'income' });
  };

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>차량 금전출납부</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h2>🚗 차량 정보</h2>
        <p><strong>차량번호:</strong> {vehicle.number}</p>
        <p><strong>차량명:</strong> {vehicle.name}</p>
        <p><strong>기본가격:</strong> {vehicle.price.toLocaleString()} 원</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>📌 내역 추가</h3>
        <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ marginRight: '10px' }} />
        <input name="description" placeholder="내역" value={form.description} onChange={handleChange} required style={{ marginRight: '10px' }} />
        <input name="amount" type="number" placeholder="금액" value={form.amount} onChange={handleChange} required style={{ marginRight: '10px' }} />
        <select name="type" value={form.type} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
        <button type="submit">추가</button>
      </form>

      <h3>📒 수입/지출 내역</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>내역</th>
            <th>금액</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.amount.toLocaleString()} 원</td>
              <td>{tx.type === 'income' ? '수입' : '지출'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', backgroundColor: '#eef', padding: '15px', borderRadius: '8px' }}>
        <p><strong>총 수입:</strong> {income.toLocaleString()} 원</p>
        <p><strong>총 지출:</strong> {expense.toLocaleString()} 원</p>
        <p><strong>잔액:</strong> {balance.toLocaleString()} 원</p>
      </div>
    </div>
  );
}

export default App;

