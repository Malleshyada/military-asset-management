import React, { useState, useEffect } from 'react';

const Purchases = ({ userRole, userBase }) => {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({ base: userBase, equipmentType: '', quantity: '' });

  useEffect(() => {
    fetch('http://localhost:3000/api/purchases', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setPurchases(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const purchase = { ...form, date: new Date().toISOString() };
    fetch('http://localhost:3000/api/purchases', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify(purchase)
    })
      .then(() => {
        setPurchases([...purchases, purchase]);
        setForm({ base: userBase, equipmentType: '', quantity: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Purchases</h2>
      {(userRole === 'Admin' || userRole === 'Logistics Officer') && (
        <form onSubmit={handleSubmit} className="mb-4">
          <select 
            name="base" 
            className="mr-2 p-2 border" 
            value={form.base} 
            onChange={e => setForm({ ...form, base: e.target.value })}
            disabled={userRole === 'Logistics Officer'}
          >
            <option value="Base1">Base 1</option>
            <option value="Base2">Base 2</option>
          </select>
          <select 
            name="equipmentType" 
            className="mr-2 p-2 border" 
            value={form.equipmentType} 
            onChange={e => setForm({ ...form, equipmentType: e.target.value })}
          >
            <option value="">Select Equipment Type</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Weapon">Weapon</option>
            <option value="Ammunition">Ammunition</option>
          </select>
          <input 
            type="number" 
            name="quantity" 
            placeholder="Quantity" 
            className="mr-2 p-2 border" 
            value={form.quantity} 
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />
          <button type="submit" className="p-2 bg-blue-500 text-white">Add Purchase</button>
        </form>
      )}
      <h3 className="text-xl mt-4">Purchase History</h3>
      <table className="w-full mt-2 border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Base</th>
            <th className="border p-2">Equipment Type</th>
            <th className="border p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.date}</td>
              <td className="border p-2">{p.base}</td>
              <td className="border p-2">{p.equipmentType}</td>
              <td className="border p-2">{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;