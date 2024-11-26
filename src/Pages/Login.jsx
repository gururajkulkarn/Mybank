import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Login = () => {
  const [text, setText] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const SUPERADMIN_CREDENTIALS = {
      username: 'superadmin',
      password: '123'
    };
  
    // Superadmin login check
    if (text.email === SUPERADMIN_CREDENTIALS.username && text.password === SUPERADMIN_CREDENTIALS.password) {
      localStorage.setItem('token', 'hardcodedSuperAdminToken');
      localStorage.setItem('role', 'superadmin');
      navigate('/superadmin');
      return;
    }
  
    try {
      // Normal login flow for admin and users
      const response = await axios.post(`${config.apiBaseUrl}/login`, text);
      const { token, role } = response.data;
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        if (role === 'admin' ) {
          navigate('/home'); // Redirect to admin dashboard
        } else if (role === 'user') {
          navigate('/user'); // Redirect to user dashboard
        } else {
          alert('Invalid role');
        }
      } else {
        alert('Incorrect credentials');
      }
    } catch (error) {
      console.error('Error logging in', error.response ? error.response.data : error);
      alert('Incorrect credentials');
    }
  };
  

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder='Email'
            onChange={e => setText({ ...text, email: e.target.value })}
            required
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3" >
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder='Password'
            onChange={e => setText({ ...text, password: e.target.value })}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className='btn btn-primary w-100 mb-4'>Login</button>
        {/* <Link to="/register">
          <button type="button" className="btn btn-success w-100 py-2">Register</button>
        </Link> */}
      </form>
      <Outlet />
    </main>
  );
};

export default Login;
