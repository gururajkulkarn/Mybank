import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../SuperAdminSidebar'
import Header from "../Header";
import config from 'config';

const SuperAdmin = () => {

  const [data, setData] = useState([]);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Axios configuration for authorization headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const generateMemberNo = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
    return `ADMN${randomNumber}`;
  };

  const [adminData, setAdminData] = useState({
    adminno: generateMemberNo(),
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    role: 'admin', // Default role set to admin
  });




  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from local storage

    try {
      const response = await axios.post(`${config.apiBaseUrl}/createAdmin`, adminData, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the header
        }
      });

      console.log(response.data); // Log the response for debugging
      alert("Admin created successfully!");

      // Reset the form after successful creation
      setAdminData({
        adminno: generateMemberNo(),
        fname: '',
        lname: '',
        mobile: '',
        email: '',
        password: '',
        role: 'admin', // Reset role to default
      });

      navigate('/superadmin'); // Navigate back to the superadmin page
    } catch (error) {
      console.error('Error creating admin', error);
      alert('Failed to create admin, please try again.'); // Alert on error
    }
  };


  useEffect(() => {

    axios.get(`${config.apiBaseUrl}/admins`, config)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })


  }, [])




  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <SuperAdminSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <div className="container">

          <h1 style={{ color: "green" }}>SuperAdmin Dashboard</h1><br />
          <h1>Create Admin</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <label className='form-label'>Admin Number</label>
                <input
                  type="text" name="adminno" value={adminData.adminno} onChange={e => setAdminData({ ...adminData, adminno: e.target.value })}
                  className="form-control "
                  placeholder="Member Number" required
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="floatingInput">First Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  placeholder='First Name'
                  value={adminData.fname}
                  onChange={e => setAdminData({ ...adminData, fname: e.target.value })}
                  required
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="floatingInput">Last Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  placeholder='Last Name'
                  value={adminData.lname}
                  onChange={e => setAdminData({ ...adminData, lname: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="floatingInput">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  placeholder='Mobile'
                  value={adminData.mobile}
                  onChange={e => setAdminData({ ...adminData, mobile: e.target.value })}
                  required
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="floatingInput">Email address</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder='Email'
                  value={adminData.email}
                  onChange={e => setAdminData({ ...adminData, email: e.target.value })}
                  required
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="floatingPassword">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder='Password'
                  value={adminData.password}
                  onChange={e => setAdminData({ ...adminData, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <button className="btn btn-success w-25 py-2 m-2">Create Admin</button>
          </form>
        </div>


        <h1>Admins</h1>
        <div  className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Si.No.</th>
              <th scope="col">Admin Number</th>
              <th scope="col">Full Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile </th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.adminno}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </main>

    </>
  );
};

export default SuperAdmin;
