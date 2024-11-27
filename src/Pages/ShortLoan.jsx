import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const ShortLoan = ({ member }) => {
    const [text, setText] = useState({
        memberno: '',
        fullname: '',
        month: '',
        year: '',
        loanamount: '',
        duration: '1',
        emiamount: '',
        interest: ''
    });

    useEffect(() => {
        if (member) {
            setText((prev) => ({
                ...prev,
                memberno: member.memberno || '',
                fullname: member.fullname || '',
            }));
        }
    }, [member]);

    const handlesubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.post(`${config.apiBaseUrl}/shortloan`, text, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                alert("Short loan sanctioned successfully.");
                setText({
                    memberno: '',
                    fullname: '',
                    month: '',
                    year: '',
                    loanamount: '',
                    duration: '1',
                    emiamount: '',
                    interest: ''
                });
            }).catch(error => console.log(error));
    };

    const handleLoanAmountChange = (e) => {
        const loanamount = e.target.value;
        setText((prev) => ({ ...prev, loanamount }));
        calculateEMI(loanamount, text.interest);
    };

    const handleInterestChange = (e) => {
        const interest = e.target.value;
        setText((prev) => ({ ...prev, interest }));
        calculateEMI(text.loanamount, interest);
    };

    const calculateEMI = (loanamount, interestRate) => {
        if (!loanamount || !interestRate) return;
        const principal = parseFloat(loanamount);
        const rate = parseFloat(interestRate) / 100;
        const totalPayment = principal * (1 + rate); // Basic calculation
        setText((prev) => ({ ...prev, emiamount: totalPayment.toFixed(2) }));
    };

    return (
        <main className="main-container">
            <h2>Short Term Loan</h2>
            <form onSubmit={handlesubmit}>
                <div className="row">
                    <div className="col-lg-4">
                        <label className='form-label'>Member Number</label>
                        <input
                            type="text"
                            name="memberno"
                            value={text.memberno}
                            onChange={(e) => setText({ ...text, memberno: e.target.value })}
                            className="form-control-lg m-2 w-75"
                            placeholder="Member Number"
                            readOnly
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Member Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={text.fullname}
                            onChange={(e) => setText({ ...text, fullname: e.target.value })}
                            className="form-control-lg m-2 w-75"
                            placeholder="Full Name"
                            readOnly
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Select Month</label>
                        <select
                            className="form-control-lg m-2 w-75"
                            name="month"
                            value={text.month}
                            onChange={(e) => setText({ ...text, month: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="Jun">Jun</option>
                            <option value="July">July</option>
                            <option value="Aug">Aug</option>
                            <option value="Sept">Sept</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label className='form-label'>Sanction Year</label>
                        <input
                            type="text"
                            name="year"
                            value={text.year}
                            onChange={(e) => setText({ ...text, year: e.target.value })}
                            className="form-control-lg m-2 w-75"
                            placeholder="Year"
                            required
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Loan Amount</label>
                        <input
                            type="text"
                            name="loanamount"
                            value={text.loanamount}
                            onChange={handleLoanAmountChange}
                            className="form-control-lg m-2 w-75"
                            placeholder="Loan Amount"
                            required
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Duration in (Months)</label>
                        <input
                            type="text"
                            name="duration"
                            style={{ backgroundColor: "skyblue" }}
                            value={text.duration}
                            className="form-control-lg m-2 w-75"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label className='form-label'>Rate of Interest</label>
                        <input
                            type="text"
                            name="interest"
                            value={text.interest}
                            onChange={handleInterestChange}
                            className="form-control-lg m-2 w-75"
                            placeholder="Interest Rate (%)"
                            required
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Total Amount To Pay</label>
                        <input
                            type="text"
                            name="emiamount"
                            value={text.emiamount}
                            className="form-control-lg m-2 w-75"
                            placeholder="EMI Amount"
                            readOnly
                        />
                    </div>
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </main>
    );
};

export default ShortLoan;
