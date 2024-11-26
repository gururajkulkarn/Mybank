import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { BsGrid1X2Fill, BsFillArchiveFill  } from 'react-icons/bs'
import { TbSettings2 } from "react-icons/tb";
import { IoChevronForwardOutline } from "react-icons/io5";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleDashboardClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <>
      <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-title'>
        <div className='sidebar-brand'>
            <TbSettings2  className='icon_header' /> Dashboard
          </div>
      
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
            <Link to="#" onClick={handleDashboardClick}>
              <BsGrid1X2Fill className='icon' /> Settings  <IoChevronForwardOutline />
            </Link>
            {showSubMenu && (
              <ul className="submenu">
                 <li className='sidebar-submenu-item'>
                  <Link to="/home"> Dashboard</Link>
                </li>
            
                <li  className='sidebar-submenu-item'>
                  <Link to="#">Address</Link>
                </li>
              </ul>
            )}
          </li>
          <li className='sidebar-list-item'>
            <Link to="/newcontact">
              <BsFillArchiveFill className='icon' /> New Contact
            </Link>
          </li>
        
      
        </ul>
      </aside>

      <Outlet />
    </>
  )
}

export default Sidebar;
