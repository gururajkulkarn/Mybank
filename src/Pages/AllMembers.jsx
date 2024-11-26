import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShortLoan from './ShortLoan';
import LongLoan from './LongLoan';

const AllMembers = () => {
    const [data, setData] = useState([]);
    const [currentLoan, setCurrentLoan] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null); // State to store the selected member data

// Get token from localStorage
const token = localStorage.getItem('token');

// Axios configuration for authorization headers
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};


    useEffect(() => {
        axios.get("http://localhost:3001/allMember", config)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleLoanClick = (loanType, member) => {
        setCurrentLoan(loanType);
        setSelectedMember(member); // Set the selected member data
    };

    return (
        <>
            <h2>All Members</h2>
            <div className="table-responsive">
            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Si.No.</th>
                        <th scope="col">Member Number</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Total Share Amount</th>
                        <th scope="col">Monthly Share Amount</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Short Loan</th>
                        <th scope="col">Long Loan</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.memberno}</td>
                            <td>{user.fullname}</td>
                            <td>{user.tsamount}</td>
                            <td>{user.msamount}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="btn btn-primary w-75 "
                                    onClick={() => handleLoanClick("short", user)}
                                >
                                    <h6>Short Loan</h6>
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary w-75"
                                    onClick={() => handleLoanClick("long", user)}
                                >
                                    <h6>Long Loan</h6>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {/* Render ShortLoan or LongLoan based on currentLoan state, passing selectedMember */}
            <div className="loan-details">
                {currentLoan === "short" && <ShortLoan member={selectedMember} />}
                {currentLoan === "long" && <LongLoan member={selectedMember} />}
            </div>
        </>
    );
}

export default AllMembers;
