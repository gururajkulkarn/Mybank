import React, { useState } from 'react';
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Link, Outlet } from "react-router-dom";
import AllMembers from './AllMembers';

const SactionLoan = () => {

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
                <h2> Loan Section</h2>
                <AllMembers/>
                 
            </main>

            <Outlet />
        </>
    );
}

export default SactionLoan;
