import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import heroImage from '../assets/hero.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <img className="auth-image" src={heroImage} alt="HarvestHub farm field" />
      <h2 className="text-center text-success mb-4">HarvestHub</h2>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
