import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api.js';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      if (setToken) setToken(token);
      navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 mb-3 border rounded" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
