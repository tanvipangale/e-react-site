import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const WORDPRESS_URL = 'http://localhost/wordpress';
    try {
      setLoading(true);
      const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid Credentials');

      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('loggedInUser', data.user_display_name || formData.username);
        alert('Welcome back!');
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Log in to Exclusive</h1>
        
        {error && (
          <p style={{ color: '#C88E72', textAlign: 'left', marginBottom: '15px', fontWeight: '500' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Email or Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          
          <p>
            Don't have an account? 
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;