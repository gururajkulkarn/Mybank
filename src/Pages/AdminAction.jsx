import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from 'axios';
import config from '../config';

const AdminAction = () => {
    const [data, setData] = useState([]); // Stores new member data
    const [loandata, setLoandata] = useState([]); // Stores Long Loan data
    const [sloandata, setSloandata] = useState([]); // Stores Short Loan data
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [penaltyFees, setPenaltyFees] = useState({});
    const [cmonthYear, setCmonthYear] = useState({});
    const [loanstatus, setLoanstatus] = useState({});
    const [lloanstatus, setLloanstatus] = useState({});
    const [clickedMembers, setClickedMembers] = useState([]); // Track all clicked membernos

    const [loanData, setLoanData] = useState({}); // New state to store loan data per member

    const [text, setText] = useState({
        // memberno: member?.memberno || '',
        // fullname: member?.fullname || '',
        month: '',
        year: '',
        loanamount: '',
        duration: '',
        emiamount: '',
        interest: '',
        inamount: '',
        principal: '',
        loanoutst: ''  // New field for principal amount
    });


    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const token = localStorage.getItem('token');

    const axiosconfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };



    const fetchNewMembers = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/allMember`, axiosconfig);
            setData(response.data);
            console.log("New members fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching new members:", error);
        }
    };

    const fetchShortLoan = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/shortloan`, axiosconfig);
            setSloandata(response.data);
            console.log("Short loans fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching short loan data:", error);
        }
    };

    const fetchLongLoan = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/longloan`, axiosconfig);
            setLoandata(response.data);
            console.log("Long loans fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching long loan data:", error);
        }
    };

    useEffect(() => {
        fetchNewMembers();
        fetchShortLoan();
        fetchLongLoan();


        const savedClickedMembers = JSON.parse(localStorage.getItem('clickedMembers')) || [];
        setClickedMembers(savedClickedMembers);
    }, []);

    const shortLoanMapping = sloandata.reduce((acc, loan) => {
        acc[loan.memberno] = {
            amount: loan.loanamount,
            emi: loan.emiamount,
            duration: loan.duration,
            rate: loan.interest,
            month: loan.month,
            year: loan.year
        };
        return acc;
    }, {});

    const longLoanMapping = loandata.reduce((acc, loan) => {
        acc[loan.memberno] = {
            amount: loan.loanamount,
            duration: loan.duration,
            principal: loan.principal,
            inamount: loan.inamount,
            rate: loan.interest,
            emi: loan.emiamount,
            loanoutst:loan.loanoutst,
            month: loan.month,
            year: loan.year
        };
        return acc;
    }, {});

    const handlePenaltyFeeChange = (memberno, value) => {
        setPenaltyFees((prevFees) => ({
            ...prevFees,
            [memberno]: value,
        }));
    };

    const handleCmonthYearChange = (memberno, value) => {
        setCmonthYear((prevFees) => ({
            ...prevFees,
            [memberno]: value,
        }));
    };

    const handleLoanStatus = async (memberno, value) => {
        setLoanstatus((prevStatus) => ({
            ...prevStatus,
            [memberno]: value,
        }));

        // If loan status is set to "Loan Closed", reset short loan details to zero
        if (value === "Loan Closed") {
            // Update the backend to reset the short loan data for this member
            try {
                await axios.put(`${config.apiBaseUrl}/resetShortLoan/${memberno}`, {
                    loanamount: 0,
                    duration: 0,
                    interest: 0,
                    emiamount: 0,
                    month: 0,
                    year: 0,
                }, axiosconfig);

                console.log(`Short loan data reset for member: ${memberno}`);
                // Optionally fetch the updated data again to reflect the reset values
                fetchShortLoan();
            } catch (error) {
                console.error("Error resetting short loan data:", error);
            }
        }
    };

    const handleLLoanStatus = async (memberno, value) => {
        setLloanstatus((prevStatus) => ({
            ...prevStatus,
            [memberno]: value,
        }));
        // If loan status is set to "Loan Closed", reset short loan details to zero
        if (value === "Loan Closed") {
            // Update the backend to reset the short loan data for this member
            try {
                await axios.put(`${config.apiBaseUrl}/resetLongLoan/${memberno}`, {
                    loanamount: 0,
                    duration: 0,
                    principal: 0,
                    interest: 0,
                    inamount: 0,
                    emiamount: 0,
                    loanoutst:0,
                    month: 0,
                    year: 0,
                }, axiosconfig);

                console.log(`Short loan data reset for member: ${memberno}`);
                // Optionally fetch the updated data again to reflect the reset values
                fetchLongLoan();
            } catch (error) {
                console.error("Error resetting short loan data:", error);
            }
        }
    }



    // useEffect(() => {
    //     calculatePrincipal(text.loanamount, text.duration);
    //     calculateInterestAmount(text.loanamount, text.interest);
    //     calculateEMI(text.principal, text.inamount); // Keep your original EMI calculation

    // }, [text.loanamount, text.interest, text.duration, text.principal, text.inamount]); // Add necessary dependencies


    useEffect(() => {
        Object.keys(loanData).forEach((memberno) => {
            const { loanamount,principal, inamount } = loanData[memberno] || {};
            calculateEMI(memberno, principal, inamount);
            calculateLoanoutst(memberno,loanamount, principal );
        });
    }, [loanData]);




    const handleLoanAmountChange = (memberno, e) => {
        const loanamount = e.target.value;
        setLoanData((prevLoanData) => {
            const updatedLoanData = {
                ...prevLoanData,
                [memberno]: {
                    ...prevLoanData[memberno],
                    loanamount,
                    principal: calculatePrincipal(loanamount, prevLoanData[memberno]?.duration),
                },
            };

            return updatedLoanData;
        });
    };

    const handleDurationChange = (memberno, e) => {
        const duration = e.target.value;
        setLoanData((prevLoanData) => {
            const updatedLoanData = {
                ...prevLoanData,
                [memberno]: {
                    ...prevLoanData[memberno],
                    duration,
                    principal: calculatePrincipal(prevLoanData[memberno]?.loanamount, duration),
                },
            };

            return updatedLoanData;
        });
    };


    const handleInterestChange = (memberno, e) => {
        const interest = e.target.value;
        setLoanData((prevLoanData) => {
            const loanamount = prevLoanData[memberno]?.loanamount || 0; // Ensure loanamount exists
            const updatedLoanData = {
                ...prevLoanData,
                [memberno]: {
                    ...prevLoanData[memberno],
                    interest, // Update interest value
                    inamount: calculateInterestAmount(loanamount, interest), // Calculate interest amount
                },
            };

            return updatedLoanData;
        });
    };



    const calculatePrincipal = (loanamount, duration) => {
        if (!loanamount || !duration) return 0;

        const principalAmount = parseFloat(loanamount) / parseInt(duration);
        return principalAmount.toFixed(2); // Return instead of setting directly
    };


    const calculateInterestAmount = (loanamount, interestRate) => {
        if (!loanamount || !interestRate) return 0; // Handle edge cases
        return parseFloat(loanamount) * (parseFloat(interestRate) / 100);
    };


    const calculateEMI = (memberno, principal, inamount) => {
        if (!principal || !inamount) return;

        const emi = parseFloat(principal) + parseFloat(inamount);

        setLoanData((prevLoanData) => ({
            ...prevLoanData,
            [memberno]: {
                ...prevLoanData[memberno],
                emiamount: emi.toFixed(2),
            },
        }));
    };

    
    const calculateLoanoutst = (memberno,loanamount, principal) => {
        if (!loanamount || !principal) return;

        const emi = parseFloat(loanamount) - parseFloat(principal);

        setLoanData((prevLoanData) => ({
            ...prevLoanData,
            [memberno]: {
                ...prevLoanData[memberno],
                loanoutst: emi.toFixed(2),
            },
        }));
    };


    const handleSave = async (user) => {
        try {
            const memberLoanData = loanData[user.memberno] || {}; // Get the loan data for this specific member

            const response = await axios.post(
                `${config.apiBaseUrl}/monthlydata`,
                {
                    memberno: user.memberno,
                    fullname: user.fullname,
                    totalShareAmount: user.tsamount,
                    monthlyShareAmount: user.msamount,
                    shortLoanMonth: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.month || 0),
                    shortLoanYear: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.year || 0),
                    shortLoanAmount: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.amount || 0),
                    shortLoanDuration: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.duration || 0),
                    shortLoanInterest: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.rate || 0),
                    shortLoanEmi: loanstatus[user.memberno] === "Loan Closed" ? 0 : (shortLoanMapping[user.memberno]?.emi || 0),
                    shortloanStatus: loanstatus[user.memberno] || 0,

                    // Long loan data from `loanData` state
                    longLoanMonth: lloanstatus[user.memberno] === "Loan Closed" ? 0 : (longLoanMapping[user.memberno]?.month || 0),
                    longLoanYear: lloanstatus[user.memberno] === "Loan Closed" ? 0 : (longLoanMapping[user.memberno]?.year || 0),
                    longLoanAmount: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.loanamount,
                    longLoanDuration: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.duration,
                    longLoanPrincipal: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.principal,
                    longLoanInterest: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.interest,
                    longLoanInterestAmount: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.inamount,
                    longLoanEmi: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.emiamount,
                    longLoanOuts: lloanstatus[user.memberno] === "Loan Closed" ? 0 : memberLoanData.loanoutst,
                    longLoanStatus: lloanstatus[user.memberno] || 0,

                    penaltyFee: penaltyFees[user.memberno] || 0,
                    cmonthYear: cmonthYear[user.memberno] || 0,
                },
                axiosconfig
            );

            console.log('New data saved for a different month/year:', response.data);
            alert("Data saved for a different month/year successfully");

            const updatedClickedMembers = [...clickedMembers, user.memberno];
            setClickedMembers(updatedClickedMembers);
            localStorage.setItem('clickedMembers', JSON.stringify(updatedClickedMembers));
        } catch (error) {
            console.error('Error saving data:', error);
            alert("This Month Already Saved");
        }
    };



    return (
        <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className="main-container">
                <h2>Monthly Entry</h2>
                <div  className="table-responsive">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Si.No.</th>
                            <th scope="col">Month-Year</th>
                            <th scope="col">Member Number</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Initial Total Share Amount</th>
                            <th scope="col">Monthly Share Amount</th>
                            <th scope="col">Short Loan Amount</th>
                            <th scope="col">Short Loan Sanctioned (M-Y)</th>
                            <th scope="col">Short Loan Duration</th>
                            <th scope="col">Short Loan Interest</th>
                            <th scope="col">Short Loan Emi Amount</th>
                            <th scope="col">Short Loan Status</th>
                            <th scope="col">Long Loan Amount</th>
                            {/* <th scope="col">Long Loan Sanctioned (M-Y)</th> */}
                            <th scope="col">Long Loan Duration</th>
                            <th scope="col">Long Loan Principle</th>
                            <th scope="col">Long Loan Interest</th>
                            <th scope="col">Long Loan Interest Amount</th>
                            <th scope="col">Long Loan Emi Amount</th>
                            <th scope="col">Long Loan Outstanding</th>
                            <th scope="col">Long Loan Status</th>
                            <th scope="col">Penalty Fee</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <input
                                        type="text"
                                        value={cmonthYear[user.memberno] || ''}
                                        onChange={(e) => handleCmonthYearChange(user.memberno, e.target.value)}
                                        placeholder="ex:Jan-2024" required
                                    />
                                </td>
                                <td>{user.memberno}</td>
                                <td>{user.fullname}</td>
                                <td>{user.tsamount}</td>
                                <td>{user.msamount}</td>
                                <td>{shortLoanMapping[user.memberno]?.amount || 0}</td>
                                <td>{shortLoanMapping[user.memberno]?.month || ''}-{shortLoanMapping[user.memberno]?.year || ''}</td>
                                <td>{shortLoanMapping[user.memberno]?.duration || 0}</td>
                                <td>{shortLoanMapping[user.memberno]?.rate || 0}</td>
                                <td>{shortLoanMapping[user.memberno]?.emi || 0}</td>
                                <td>
                                    <select value={loanstatus[user.memberno] || ''}
                                        onChange={(e) => handleLoanStatus(user.memberno, e.target.value)} >
                                        <option value="Select">Select</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Active">Active</option>
                                        <option value="Loan Closed">Loan Closed</option>
                                    </select>
                                </td>

                                <td><input
                                    type="text"
                                    name="loanamount"
                                    value={loanData[user.memberno]?.loanamount || ''}
                                    onChange={(e) => handleLoanAmountChange(user.memberno, e)}
                                />
                                </td>
                                {/* <td>{longLoanMapping[user.memberno]?.month || ''}-{longLoanMapping[user.memberno]?.year || ''}</td>
                                */}
                                <td><input 
                                    type="text"
                                    name="duration"
                                    value={loanData[user.memberno]?.duration || ''}
                                    onChange={(e) => handleDurationChange(user.memberno, e)}
                                /></td>
                                <td><input
                                    type='text'
                                    name="principal"
                                    value={loanData[user.memberno]?.principal || ''}
                                    readOnly
                                /></td>
                                <td><input
                                    type='text'
                                    name="interest"
                                    value={loanData[user.memberno]?.interest || ''}
                                    onChange={(e) => handleInterestChange(user.memberno, e)} /></td>

                                <td><input type='text' value={loanData[user.memberno]?.inamount || ''} /></td>
                                <td><input type='text' value={loanData[user.memberno]?.emiamount || ''} /></td>
                                <td><input type='text' value={loanData[user.memberno]?.loanoutst || ''} /></td>

                                <td>
                                    <select value={lloanstatus[user.memberno] || ''}
                                        onChange={(e) => handleLLoanStatus(user.memberno, e.target.value)}>
                                        <option value="Select">Select</option>
                                        <option value="Emi Paid">Emi Paid</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Loan Closed">Loan Closed</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={penaltyFees[user.memberno] || ''}
                                        onChange={(e) => handlePenaltyFeeChange(user.memberno, e.target.value)}
                                        placeholder="Enter penalty fee"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave(user)}
                                        style={{
                                            backgroundColor: clickedMembers.includes(user.memberno) ? 'green' : '', // Green color for clicked button
                                            color: 'black', width: "100px", border: "1px solid black", borderRadius: "20px"
                                        }}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </main>
        </>
    );
}

export default AdminAction;
