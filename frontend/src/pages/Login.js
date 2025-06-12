import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', form);
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
          className="p-2 mb-2 border rounded w-full"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="p-2 mb-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-700 text-white rounded w-full hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;