import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar";
import Header from "../Header";

const MonthlyCollection = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [data, setData] = useState([]); // Stores all monthly data
    const [filteredData, setFilteredData] = useState([]); // Stores filtered data based on selected month
    const [selectedMonth, setSelectedMonth] = useState(''); // Stores selected month

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    

    const fetchMonthlyData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/monthlyReports', {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Fetched monthly data:", response.data);
            if (Array.isArray(response.data)) {
                setData(response.data);
                setFilteredData(response.data); // Set initial data to display all months
            } else if (response.data) {
                setData([response.data]);
                setFilteredData([response.data]);
            } else {
                setData([]);
                setFilteredData([]);
            }
        } catch (error) {
            console.error("Error fetching monthly data:", error);
        }
    };

    useEffect(() => {
        fetchMonthlyData();
    }, []);

    const handleMonth = (event) => {
        const selected = event.target.value;
        setSelectedMonth(selected);

        // Filter data based on the selected month-year
        const filtered = data.filter((item) => item.cmonthYear === selected);
        setFilteredData(filtered);
    };

    return (
        <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className="main-container">
                <div className="form-group">
                <h2>Monthly Collection</h2>

                    <label htmlFor="exampleFormControlSelect1">Select Month</label>
                    <select
                        className="form-control w-25"
                        id="exampleFormControlSelect1"
                        onChange={handleMonth}
                        value={selectedMonth}
                        style={{border:"1px solid black"}}
                    >
                        <option value="">All</option>
                        <option value="Jan-2024">Jan-2024</option>
                        <option value="Feb-2024">Feb-2024</option>
                        <option value="Mar-2024">Mar-2024</option>
                        <option value="Apr-2024">Apr-2024</option>
                        <option value="May-2024">May-2024</option>
                        <option value="Jun-2024">Jun-2024</option>
                        <option value="Jul-2024">Jul-2024</option>
                        <option value="Aug-2024">Aug-2024</option>
                        <option value="Sep-2024">Sep-2024</option>
                        <option value="Oct-2024">Oct-2024</option>
                        <option value="Nov-2024">Nov-2024</option>
                        <option value="Dec-2024">Dec-2024</option>
                    </select>
                </div>
                <div  className="table-responsive">
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Si.No.</th>
                            <th scope="col">Action Month Year</th>
                            <th scope="col">Member Number</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Total Share Amount</th>
                            <th scope="col">Monthly Share Amount</th>
                            <th scope="col">Short Loan Sanctioned Month</th>
                            <th scope="col">Short Loan Amount</th>
                            <th scope="col">Short Loan Duration</th>
                            <th scope="col">Short Loan Interest(%)</th>
                            <th scope="col">Short Loan EMI Amount</th>
                            <th scope="col" style={{color:"red"}}>Short Loan Status</th>
                            <th scope="col">Long Loan Sanctioned Month</th>
                            <th scope="col">Long Loan Amount</th>
                            <th scope="col">Long Loan Duration</th>
                            <th scope="col">Long Loan Interest</th>
                            <th scope="col">Long Loan EMI Amount</th>
                            <th scope="col">Long Loan Outstanding</th>
                            <th scope="col" style={{color:"red"}}>Long Loan Status</th>
                            <th scope="col">Penalty Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.cmonthYear}</td>
                                    <td>{user.memberno}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.totalShareAmount}</td>
                                    <td>{user.monthlyShareAmount}</td>
                                    <td>{user.shortLoanMonth}-{user.shortLoanYear}</td>
                                    <td>{user.shortLoanAmount || 0}</td>
                                    <td>{user.shortLoanDuration || 0}</td>
                                    <td>{user.shortLoanInterest || 0}</td>
                                    <td>{user.shortLoanEmi || 0}</td>
                                    <td>{user.shortloanStatus || 0}</td>
                                    <td>{user.longLoanMonth}-{user.longLoanYear}</td>
                                    <td>{user.longLoanAmount || 0}</td>
                                    <td>{user.longLoanDuration || 0}</td>
                                    <td>{user.longLoanInterest || 0}</td>
                                    <td>{user.longLoanEmi || 0}</td>
                                    <td>{user.longLoanOuts || 0}</td>
                                    <td>{user.longLoanStatus || 0}</td>
                                    <td>{user.penaltyFee || 0}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="18">No monthly data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </main>
        </>
    );
};

export default MonthlyCollection;
