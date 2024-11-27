import React, { useState } from 'react'
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from 'axios';
import config from '../config';

const FinantialSettings = () => {


    const [text, setText] = useState({
        interest: '',
        investment: ''
    })
    const handlesubmit = (e) => {
        e.preventDefault()
        axios.post(`${config.apiBaseUrl}/financeSetting`, text)
            .then((response) => {
                console.log(response.text)
                alert("Finantial setting successfull..")
                setText({
                    interest: '',
                    investment: ''
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
                <h2>Finantial Settings</h2>
                <form onSubmit={handlesubmit}>
                    <div className="row">
                        <div className="col-lg-4">
                            <label className='form-label'>Rate of Interest</label>
                            <select className="form-select-lg m-2 w-75" name='interest' value={text.interest}    onChange={e => setText({...text,interest: e.target.value})} aria-label="Default select example" required>
                                <option selected>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label>Initial Investment</label>
                            <input 
                                type="text" name="investment" value={text.investment}    onChange={e => setText({...text,investment: e.target.value})}
                                className="form-control-lg m-2 w-75"
                                placeholder="Initial Investment" required
                            />
                        </div>
                    </div>
                    
                    <button className="btn btn-success">Submit</button>
                </form>
            </main>
        </>
    )
}

export default FinantialSettings