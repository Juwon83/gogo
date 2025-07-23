import { useState, useEffect } from 'react';

function App() {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('vehicles');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        number: '106하1005',
        name: 'The 2025 K5 Lpi 트렌디 25MY',
        price: 25070000,
        transactions: []
      }
    ];
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0].id);
  const [form, setForm] = useState({ date: '', description: '', amount: '', type: 'income' });
  const [newVehicle, setNewVehicle] = useState({ number: '', name: '', price: '' });

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  const transactions = selectedVehicle.transactions;

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
    const updatedVehicles = vehicles.map(v =>
      v.id === selectedVehicleId
        ? { ...v, transactions: [...v.transactions, newTransaction] }
        : v
    );
    setVehicles(updatedVehicles);
    setForm({ date: '', description: '', amount: '', type: 'income' });
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicleId(parseInt(e.target.value));
  };

  const handleNewVehicleChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleNewVehicleAdd = () => {
    const newId = Date.now();
    const newEntry = {
      id: newId,
      number: newVehicle.number,
      name: newVehicle.name,
      price: parseInt(newVehicle.price),
      transactions: []
    };
    setVehicles([...vehicles, newEntry]);
    setSelectedVehicleId(newId);
    setNewVehicle({ number: '', name: '', price: '' });
  };

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>차량 금전출납부</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>🚘 차량 선택: </label>
        <select value={selectedVehicleId} onChange={handleVehicleChange}>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.number} - {v.name}</option>
          ))}
        </select>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h2>🚗 차량 정보</h2>
        <p><strong>차량번호:</strong> {selectedVehicle.number}</p>
        <p><strong>차량명:</strong> {selectedVehicle.name}</p>
        <p><strong>기본가격:</strong> {selectedVehicle.price.toLocaleString()} 원</p>
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

      <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>➕ 차량 추가</h3>
        <input name="number" placeholder="차량번호" value={newVehicle.number} onChange={handleNewVehicleChange} style={{ marginRight: '10px' }} />
        <input name="name" placeholder="차량명" value={newVehicle.name} onChange={handleNewVehicleChange} style={{ marginRight: '10px' }} />
        <input name="price" type="number" placeholder="기본가격" value={newVehicle.price} onChange={handleNewVehicleChange} style={{ marginRight: '10px' }} />
        <button onClick={handleNewVehicleAdd}>차량 추가</button>
      </div>
    </div>
  );
}

export default App;
