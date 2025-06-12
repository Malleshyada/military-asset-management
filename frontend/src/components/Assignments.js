import React, { useState, useEffect } from 'react';

const Assignments = ({ userRole, userBase }) => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ base: userBase, personnel: '', equipmentType: '', quantity: '', status: 'assigned' });

  useEffect(() => {
    fetch('http://localhost:3000/api/assignments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignment = { ...form, date: new Date().toISOString() };
    fetch('http://localhost:3000/api/assignments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify(assignment)
    })
      .then(() => {
        setAssignments([...assignments, assignment]);
        setForm({ base: userBase, personnel: '', equipmentType: '', quantity: '', status: 'assigned' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Assignments & Expenditures</h2>
      {(userRole === 'Admin' || userRole === 'Base Commander') && (
        <form onSubmit={handleSubmit} className="mb-4">
          <select 
            name="base" 
            className="mr-2 p-2 border" 
            value={form.base} 
            onChange={e => setForm({ ...form, base: e.target.value })}
            disabled={userRole === 'Base Commander'}
          >
            <option value="Base1">Base 1</option>
            <option value="Base2">Base 2</option>
          </select>
          <input 
            type="text" 
            name="personnel" 
            placeholder="Personnel" 
            className="mr-2 p-2 border" 
            value={form.personnel} 
            onChange={e => setForm({ ...form, personnel: e.target.value })}
          />
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
          <select 
            name="status" 
            className="mr-2 p-2 border" 
            value={form.status} 
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="assigned">Assigned</option>
            <option value="expended">Expended</option>
          </select>
          <button type="submit" className="p-2 bg-blue-500 text-white">Add Assignment</button>
        </form>
      )}
      <h3 className="text-xl mt-4">Assignment History</h3>
      <table className="w-full mt-2 border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Base</th>
            <th className="border p-2">Personnel</th>
            <th className="border p-2">Equipment Type</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, i) => (
            <tr key={i}>
              <td className="border p-2">{a.date}</td>
              <td className="border p-2">{a.base}</td>
              <td className="border p-2">{a.personnel}</td>
              <td className="border p-2">{a.equipmentType}</td>
              <td className="border p-2">{a.quantity}</td>
              <td className="border p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;