import { useEffect, useState } from "react";

function App() {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem("cars");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [form, setForm] = useState({
    plate: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addCar = () => {
    if (!form.plate || !form.name || !form.price) return;
    setCars([...cars, form]);
    setForm({ plate: "", name: "", price: "" });
    setSelectedCarIndex(cars.length); // 방금 추가된 차량 선택
  };

  const selectedCar = cars[selectedCarIndex];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚗 차량 금전출납부</h1>

      <div className="mb-6 p-4 border rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">차량 등록</h2>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <input
            className="border p-2 rounded"
            placeholder="차량번호"
            name="plate"
            value={form.plate}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="차량명"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="기본가격"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addCar}
        >
          차량 추가
        </button>
      </div>

      {cars.length > 0 && (
        <div className="mb-6">
          <select
            className="border p-2 rounded mb-2"
            value={selectedCarIndex}
            onChange={(e) => setSelectedCarIndex(Number(e.target.value))}
          >
            {cars.map((car, i) => (
              <option key={i} value={i}>
                {car.plate} - {car.name}
              </option>
            ))}
          </select>

          <div className="border p-4 rounded-xl shadow bg-gray-50">
            <p className="text-xl font-bold mb-1">{selectedCar.plate} 금전출납부</p>
            <p className="text-sm text-gray-700">차량명: {selectedCar.name}</p>
            <p className="text-sm text-gray-700">기본가격: {Number(selectedCar.price).toLocaleString()}원</p>
          </div>
        </div>
      )}

      {/* 수입/지출 내역 추가는 다음 단계에서 구현 */}
    </div>
  );
}

export default App;
