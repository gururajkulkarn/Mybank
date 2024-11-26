import React from "react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Link, Outlet } from "react-router-dom";

function Home() {
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
        <div className="main-title">
          <h3>ADMIN DASHBOARD</h3>
        </div>

        <div className="main-cards">


        <Link to="/financesetting">  <button className="btn btn-primary"><h4>Finantial Settings</h4></button></Link>
        <Link to="/newmember">  <button className="btn btn-primary"><h4>Create Member</h4></button> </Link>
        <Link to="/sanctionLoan"><button className="btn btn-primary"><h4>Sanction Loan</h4></button> </Link> 
        <Link to="/adminaction"><button className="btn btn-primary"><h4>Monthly Entry </h4></button> </Link> 
        <Link to="/monthlycollection"><button className="btn btn-primary"><h4>Monthly Collection </h4></button> </Link> 

        <Link to="/monthlyReports"><button className="btn btn-primary"><h4>Reports</h4></button> </Link> 

          {/*    <button className="btn btn-primary"><h4>Reports</h4></button> */}

        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">

          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%"></ResponsiveContainer>
        </div>
      </main>

      <Outlet/>
    </>
  );
}

export default Home;
