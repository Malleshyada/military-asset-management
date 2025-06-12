import React, { useState, useEffect } from 'react';

const Transfers = ({ userRole, userBase }) => {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({ fromBase: userBase, toBase: '', equipmentType: '', quantity: '' });

  useEffect(() => {
    fetch('http://localhost:3000/api/transfers', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setTransfers(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transfer = { 
      ...form, 
      date: new Date().toISOString(), 
      type: form.toBase ? 'out' : 'in' 
    };
    fetch('http://localhost:3000/api/transfers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify(transfer)
    })
      .then(() => {
        setTransfers([...transfers, transfer]);
        setForm({ fromBase: userBase, toBase: '', equipmentType: '', quantity: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Transfers</h2>
      {(userRole === 'Admin' || userRole === 'Logistics Officer') && (
        <form onSubmit={handleSubmit} className="mb-4">
          <select 
            name="fromBase" 
            className="mr-2 p-2 border" 
            value={form.fromBase} 
            onChange={e => setForm({ ...form, fromBase: e.target.value })}
            disabled={userRole === 'Logistics Officer'}
          >
            <option value="">Select From Base</option>
            <option value="Base1">Base 1</option>
            <option value="Base2">Base 2</option>
          </select>
          <select 
            name="toBase" 
            className="mr-2 p-2 border" 
            value={form.toBase} 
            onChange={e => setForm({ ...form, toBase: e.target.value })}
          >
            <option value="">Select To Base</option>
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
          <button type="submit" className="p-2 bg-blue-500 text-white">Add Transfer</button>
        </form>
      )}
      <h3 className="text-xl mt-4">Transfer History</h3>
      <table className="w-full mt-2 border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">From Base</th>
            <th className="border p-2">To Base</th>
            <th className="border p-2">Equipment Type</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t, i) => (
            <tr key={i}>
              <td className="border p-2">{t.date}</td>
              <td className="border p-2">{t.fromBase}</td>
              <td className="border p-2">{t.toBase}</td>
              <td className="border p-2">{t.equipmentType}</td>
              <td className="border p-2">{t.quantity}</td>
              <td className="border p-2">{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transfers;