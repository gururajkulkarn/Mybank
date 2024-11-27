import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jsPDF} from 'jspdf'
import "jspdf-autotable"; // Import the autotable extension
import UserSidebar from "../UserSidebar";
import Header from "../Header";
import config from '../config';

const UserDashboard = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };
    const [data, setData] = useState([]); // Stores new member data



    const fetchMonthlyData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiBaseUrl}/usermonthlydata`, {
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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");

        // Title of the document
        doc.text("Member Monthly Data Report", 20, 20);

        // Define the headers and rows for the table
        const tableHeaders = [
            "Si.No.", "Month-Year", "Member Number", "Full Name",
            "Total Share Amount", "Monthly Share Amount", "Short Loan Amount",
            "Short Loan Duration", "Short Loan Interest", "Short Loan EMI Amount", "Short Loan Status",
            "Long Loan Amount", "Long Loan Duration", "Long Loan Interest", "Long Loan EMI Amount", "Long Loan OutStanding"
        ];

        // Populate table rows from data
        const tableRows = data.map((user, index) => [
            index + 1,
            user.cmonthYear,
            user.memberno,
            user.fullname,
            user.totalShareAmount,
            user.monthlyShareAmount,
            user.shortLoanAmount || 0,
            user.shortLoanDuration || 0,
            user.shortLoanInterest || 0,
            user.shortLoanEmi || 0,
            user.shortloanStatus || 0,
            user.longLoanAmount || 0,
            user.longLoanDuration || 0,
            user.longLoanInterest || 0,
            user.longLoanEmi || 0,
            user.longLoanOuts || 0,
        ]);

        // Generate the table using autotable
        doc.autoTable({
            head: [tableHeaders],
            body: tableRows,
            theme: 'grid', 
            startY: 30, // Start below the title
            styles: { fontSize: 8 }, // Adjust font size for better fit
            headStyles: { fillColor: [0, 57, 107] }, // Header color styling
        });

        // Save the PDF
        doc.save("Member_Monthly_Data_Report.pdf");
    };

    return (
        <>
<Header OpenSidebar={OpenSidebar} />
      <UserSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
        <main className="main-container">
        <div className="main-title">
          <h1>User Dashboard</h1>
        </div>

            <h2>Monthly Data</h2>
            <button onClick={generatePDF}>Download All Data as PDF</button>

            <div  className="table-responsive">
            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Si.No.</th>
                        <th scope="col">Month-Year</th>
                        <th scope="col">Member Number</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Total Share Amount</th>
                        <th scope="col">Monthly Share Amount</th>
                        <th scope="col">Short Loan Amount</th>
                        <th scope="col">Short Loan Duration</th>
                        <th scope="col">Short Loan Interest</th>
                        <th scope="col">Short Loan EMI Amount</th>
                        <th scope="col">Short Loan Status</th>
                        <th scope="col">Long Loan Amount</th>
                        <th scope="col">Long Loan Duration</th>
                        <th scope="col">Long Loan Interest</th>
                        <th scope="col">Long Loan EMI Amount</th>       
                        <th scope="col">Long Loan OutStanding Amount</th>                   
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.cmonthYear}</td>
                                <td>{user.memberno}</td>
                                <td>{user.fullname}</td>
                                <td>{user.totalShareAmount}</td>
                                <td>{user.monthlyShareAmount}</td>
                                <td>{user.shortLoanAmount || 0}</td>
                                <td>{user.shortLoanDuration || 0}</td>
                                <td>{user.shortLoanInterest || 0}</td>
                                <td>{user.shortLoanEmi || 0}</td>
                                <td>{user.shortloanStatus || 0}</td>
                                <td>{user.longLoanAmount || 0}</td>
                                <td>{user.longLoanDuration || 0}</td>
                                <td>{user.longLoanInterest || 0}</td>
                                <td>{user.longLoanEmi || 0}</td>
                                <td>{user.longLoanOuts || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No monthly data available.</td>
                        </tr>
                    )}
                </tbody>


            </table>
            </div>
        </main>

        </>
    );
};

export default UserDashboard;
