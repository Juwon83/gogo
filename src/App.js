import { useState, useEffect } from 'react';

function App() {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('vehicles');
    return saved ? JSON.parse(saved) : [
      {
        id: Date.now(),
        number: '106하1005',
        name: 'The 2025 K5 Lpi 트렌디 25MY',
        price: 25070000,
        transactions: []
      }
    ];
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || null);
  const [newVehicle, setNewVehicle] = useState({ number: '', name: '', price: '' });
  const [form, setForm] = useState({ date: '', description: '', amount: '', type: 'income' });

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const handleVehicleChange = (e) => {
    setSelectedVehicleId(Number(e.target.value));
  };

  const handleNewVehicleChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = () => {
    const newId = Date.now();
    const newVeh = {
      id: newId,
      number: newVehicle.number,
      name: newVehicle.name,
      price: parseInt(newVehicle.price),
      transactions: []
    };
    setVehicles([...vehicles, newVeh]);
    setSelectedVehicleId(newId);
    setNewVehicle({ number: '', name: '', price: '' });
  };

  const handleDeleteVehicle = () => {
    if (window.confirm('정말 이 차량을 삭제하시겠습니까?')) {
      const updated = vehicles.filter(v => v.id !== selectedVehicleId);
      setVehicles(updated);
      if (updated.length > 0) {
        setSelectedVehicleId(updated[0].id);
      } else {
        setSelectedVehicleId(null);
      }
    }
  };

  const handleTransactionChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...form,
      amount: parseInt(form.amount),
      id: Date.now(),
    };
    const updatedVehicles = vehicles.map(v =>
      v.id === selectedVehicleId ? { ...v, transactions: [...v.transactions, newTransaction] } : v
    );
    setVehicles(updatedVehicles);
    setForm({ date: '', description: '', amount: '', type: 'income' });
  };

  const handleDeleteTransaction = (tid) => {
    if (window.confirm('해당 내역을 삭제하시겠습니까?')) {
      const updatedVehicles = vehicles.map(v =>
        v.id === selectedVehicleId ? { ...v, transactions: v.transactions.filter(t => t.id !== tid) } : v
      );
      setVehicles(updatedVehicles);
    }
  };

  const income = selectedVehicle?.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0;
  const expense = selectedVehicle?.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0;
  const balance = income - expense;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>차량 금전출납부</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h2>🚗 차량 선택 및 정보</h2>
        <select value={selectedVehicleId || ''} onChange={handleVehicleChange} style={{ marginBottom: '10px' }}>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.number}</option>
          ))}
        </select>
        {selectedVehicle && (
          <>
            <p><strong>차량번호:</strong> {selectedVehicle.number}</p>
            <p><strong>차량명:</strong> {selectedVehicle.name}</p>
            <p><strong>기본가격:</strong> {selectedVehicle.price.toLocaleString()} 원</p>
            <button 
              onClick={handleDeleteVehicle} 
              style={{ marginTop: '10px', background: '#f66', color: '#fff', padding: '5px 10px', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}
            >
              차량 삭제
            </button>
          </>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>➕ 차량 추가</h3>
        <input name="number" placeholder="차량번호" value={newVehicle.number} onChange={handleNewVehicleChange} style={{ marginRight: '5px' }} />
        <input name="name" placeholder="차량명" value={newVehicle.name} onChange={handleNewVehicleChange} style={{ marginRight: '5px' }} />
        <input name="price" placeholder="기본가격" value={newVehicle.price} onChange={handleNewVehicleChange} type="number" style={{ marginRight: '5px' }} />
        <button onClick={handleAddVehicle}>차량 추가</button>
      </div>

      <form onSubmit={handleTransactionSubmit} style={{ marginBottom: '20px' }}>
        <h3>📌 내역 추가</h3>
        <input name="date" type="date" value={form.date} onChange={handleTransactionChange} required style={{ marginRight: '10px' }} />
        <input name="description" placeholder="내역" value={form.description} onChange={handleTransactionChange} required style={{ marginRight: '10px' }} />
        <input name="amount" type="number" placeholder="금액" value={form.amount} onChange={handleTransactionChange} required style={{ marginRight: '10px' }} />
        <select name="type" value={form.type} onChange={handleTransactionChange} style={{ marginRight: '10px' }}>
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
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {selectedVehicle?.transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.amount.toLocaleString()} 원</td>
              <td>{tx.type === 'income' ? '수입' : '지출'}</td>
              <td>
                <button 
                  onClick={() => handleDeleteTransaction(tx.id)}
                  style={{ backgroundColor: '#f88', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                >
                  삭제
                </button>
              </td>
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
