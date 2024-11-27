import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar";
import Header from "../Header";
import config from '../config';

const Reports = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };
    const [data, setData] = useState([]); // Stores new member data



    const fetchMonthlyData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiBaseUrl}/monthlyReports`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Fetched monthly data:", response.data); // Log the data structure
            // Check if the data is an array or object, and adjust accordingly
            if (Array.isArray(response.data)) {
                setData(response.data); // If it's already an array
            } else if (response.data) {
                setData([response.data]); // Wrap the object in an array if it's a single object
            } else {
                setData([]); // Set empty array if the data is missing
            }
        } catch (error) {
            console.error("Error fetching monthly data:", error);
        }
    };


    useEffect(() => {
        fetchMonthlyData();
    }, []); // Fetch user data on component mount

    return (
        <>
<Header OpenSidebar={OpenSidebar} />
<Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <main className="main-container">
        <div className="main-title">
          <h1>User Dashboard</h1>
        </div>

            <h2>Monthly Data</h2>
            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Si.No.</th>
                        <th scope="col">Month</th>
                        <th scope="col">Member Number</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Total Share Amount</th>
                        <th scope="col">Monthly Share Amount</th>
                        <th scope="col">Short Loan Sanctioned Month</th>
                        <th scope="col">Short Loan Amount</th>
                        <th scope="col">Short Loan Duration</th>
                        <th scope="col">Short Loan Interest</th>
                        <th scope="col">Short Loan EMI Amount</th>
                        <th scope="col">Long Loan Sanctioned Month</th>
                        <th scope="col">Long Loan Amount</th>
                        <th scope="col">Long Loan Duration</th>
                        <th scope="col">Long Loan Interest</th>
                        <th scope="col">Long Loan EMI Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.monthYear}</td>
                                <td>{user.memberno}</td>
                                <td>{user.fullname}</td>
                                <td>{user.totalShareAmount}</td>
                                <td>{user.monthlyShareAmount}</td>
                                <td>{user.shortLoanMonth}-{user.shortLoanYear}</td>
                                <td>{user.shortLoanAmount || 0}</td>
                                <td>{user.shortLoanDuration || 0}</td>
                                <td>{user.shortLoanInterest || 0}</td>
                                <td>{user.shortLoanEmi || 0}</td>
                                <td>{user.longLoanMonth}-{user.longLoanYear}</td>
                                <td>{user.longLoanAmount || 0}</td>
                                <td>{user.longLoanDuration || 0}</td>
                                <td>{user.longLoanInterest || 0}</td>
                                <td>{user.longLoanEmi || 0}</td>
                            
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No monthly data available.</td>
                        </tr>
                    )}
                </tbody>


            </table>
        </main>

        </>
    );
};

export default Reports;
