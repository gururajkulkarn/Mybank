import React from "react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
const Address = () => {
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
        <h2>Create Address </h2>
        <div className="main-title mt-5"></div>
   

      
      </main>
    </>
  );
};

export default Address;
