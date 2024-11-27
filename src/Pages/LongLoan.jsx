import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

const LongLoan = ({ member }) => {
    const [text, setText] = useState({
        memberno: member?.memberno || '',
        fullname: member?.fullname || '',
        month: '',
        year: '',
        loanamount: '',
        duration: '',
        emiamount: '',
        interest: '',
        inamount: '',
        principal: ''  // New field for principal amount
    });

    useEffect(() => {
        calculatePrincipal(text.loanamount, text.duration);
        calculateInterestAmount(text.loanamount, text.interest);
        calculateEMI(text.principal, text.inamount); // Keep your original EMI calculation

    }, [text.loanamount, text.interest, text.duration, text.principal, text.inamount]); // Add necessary dependencies

    const handlesubmit = (e) => {
        e.preventDefault();
          // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    
        axios.post(`${config.apiBaseUrl}/longloan`, text, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        })
            .then((response) => {
                console.log(response.data);
                alert("Short loan sanctioned successfully..");
                setText({
                    memberno: '',
                    fullname: '',
                    month: '',
                    year: '',
                    loanamount: '',
                    duration: '',
                    emiamount: '',
                    interest: '',
                    inamount: '',
                    principal: ''
                });
            }).catch(error => console.log(error));
    };

    const handleLoanAmountChange = (e) => {
        const loanamount = e.target.value;
        setText((prev) => ({ ...prev, loanamount }));
    };

    const handleInterestChange = (e) => {
        const interest = e.target.value;
        setText((prev) => ({ ...prev, interest }));
    };

    const handleDurationChange = (e) => {
        const duration = e.target.value;
        setText((prev) => ({ ...prev, duration }));
    };

    const calculatePrincipal = (loanamount, duration) => {
        if (!loanamount || !duration) return;

        const principalAmount = parseFloat(loanamount) / parseInt(duration);
        setText((prev) => ({ ...prev, principal: principalAmount.toFixed(2) }));
    };

    const calculateInterestAmount = (loanamount, interest) => {
        if (!loanamount || !interest) return;

        const interestRate = parseFloat(interest) / 100; // Convert percentage to decimal
        const InterestAmount = parseFloat(loanamount) * interestRate;
        setText((prev) => ({ ...prev, inamount: InterestAmount.toFixed(2) }));
    };

    const calculateEMI = (principal, inamount) => {
        if (!principal || !inamount) return;

        const principalAmount = parseFloat(principal);
        const interestAmount = parseFloat(inamount);

        if (principalAmount > 0 && interestAmount > 0) {
            // Simply adds principal and interest for a basic total, not true EMI
            const totalAmount = principalAmount + interestAmount;
            setText((prev) => ({ ...prev, emiamount: totalAmount.toFixed(2) }));
        } else {
            setText((prev) => ({ ...prev, emiamount: '0.00' })); // Handle edge case where EMI cannot be calculated
        }
    };

    return (
        <main className="main-container">
            <h2>Long Term Loan</h2>
            <form onSubmit={handlesubmit}>
                <div className="row">
                    <div className="col-lg-4">
                        <label className='form-label'>Member Number</label>
                        <input
                            type="text"
                            name="memberno"
                            value={text.memberno}
                            onChange={e => setText({ ...text, memberno: e.target.value })}
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
                            onChange={e => setText({ ...text, fullname: e.target.value })}
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
                            value={text.duration}
                            onChange={handleDurationChange}
                            className="form-control-lg m-2 w-75"
                            placeholder="Duration"
                            required
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>Principal Amount</label>
                        <input
                            type="text"
                            name="principal"
                            value={text.principal}  // Display calculated principal amount
                            className="form-control-lg m-2 w-75"
                            placeholder="Principal Amount"
                            readOnly
                        />
                    </div>
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
                        <label className='form-label'> Interest Amount</label>
                        <input
                            type="text"
                            name="inamount"
                            value={text.inamount}
                            className="form-control-lg m-2 w-75"
                            placeholder="Interest Amount"
                            required
                        />
                    </div>
                    <div className="col-lg-4">
                        <label className='form-label'>EMI Amount</label>
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

export default LongLoan;
