import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Register = () => {
  const [text, setText] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiBaseUrl}/createRegister`, text);
      alert("Registered successfully!");
      setText({
        fname: '',
        lname: '',
        mobile: '',
        email: '',
        password: '',
        role: 'user' // Reset to default role
      });
      navigate('/'); // Redirect to login page after registration
    } catch (error) {
      console.error('Error registering', error);
      alert('Registration failed, please try again.');
    }
  };

  return (
    <>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="fname"
              placeholder='First Name'
              value={text.fname}
              onChange={e => setText({ ...text, fname: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="lname"
              placeholder='Last Name'
              value={text.lname}
              onChange={e => setText({ ...text, lname: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              name="mobile"
              placeholder='Mobile'
              value={text.mobile}
              onChange={e => setText({ ...text, mobile: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">Mobile</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder='Email'
              value={text.email}
              onChange={e => setText({ ...text, email: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder='Password'
              value={text.password}
              onChange={e => setText({ ...text, password: e.target.value })}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-success w-100 py-2">Register</button>
        </form>
        <br />
        <Link to="/"> 
          <button className='btn btn-primary w-100 mb-4'>Login</button>
        </Link> 
      </main>
      <Outlet />
    </>
  );
};

export default Register;
