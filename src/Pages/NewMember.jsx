import React, { useState } from 'react'
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from 'axios'
import config from '../config';

const NewMember = () => {

    const generateMemberNo = () => {
        const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
        return `MBNO${randomNumber}`;
    };

    const [text, setText] = useState({
        memberno: generateMemberNo(),
        fullname: '',
        tsamount: '5000',
        msamount: '1000',
        username: '',
        password: '',
        role: 'user' // Default role
    })
    const handlesubmit = (e) => {
        e.preventDefault()

        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        axios.post(`${config.apiBaseUrl}/newMember`, text, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        })
            .then((response) => {
                console.log(response.text)
                alert("New member created successfully..")
                setText({
                    memberno: generateMemberNo(),
                    fullname: '',
                    tsamount: '5000',
                    msamount: '1000',
                    username: '',
                    password: '',
                    role: 'user' // Default role
                });

            }).catch(error => console.log(error))


    }





    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    return (
        <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
            />
            <main className="main-container">
                <h2>New Member </h2>
                <form onSubmit={handlesubmit}>
                    <div className="row">
                        <div className="col-lg-4">
                            <label className='form-label'>Member Number</label>
                            <input
                                type="text" name="memberno" value={text.memberno} onChange={e => setText({ ...text, investment: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="Member Number" required
                            />
                        </div>

                        <div className="col-lg-4">
                            <label className='form-label'>Full Name</label>
                            <input
                                type="text" name="fullname" value={text.fullname} onChange={e => setText({ ...text, fullname: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="Full Name" required
                            />
                        </div>


                        <div className="col-lg-4">
                            <label className='form-label'>Total Share Amount </label>
                            <input
                                type="text" name="tsamount" value={text.tsamount} onChange={e => setText({ ...text, tsamount: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="Total Share Amount" required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <label className='form-label'>Monthly Share Amount </label>
                            <input
                                type="text" name="msamount" value={text.msamount} onChange={e => setText({ ...text, msamount: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="Monthly Share Amount" required
                            />
                        </div>
                        <div className="col-lg-4">
                            <label className='form-label'>UserName</label>
                            <input
                                type="text" name="username" value={text.username} onChange={e => setText({ ...text, username: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="UserName" required
                            />
                        </div>
                        <div className="col-lg-3">
                            <label className='form-label'>Password</label>
                            <input
                                type="text" name="password" value={text.password} onChange={e => setText({ ...text, password: e.target.value })}
                                className="form-control-lg m-2 w-75"
                                placeholder="Password" required
                            />
                        </div>
                    </div>

                    <button className="btn btn-success">Submit</button>
                </form>

            </main>

        </>
    )
}

export default NewMember