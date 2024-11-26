import React from 'react'
import 
 { BsPersonCircle, BsJustify}
 from 'react-icons/bs'
 import { Link, Outlet } from 'react-router-dom'
function Header({OpenSidebar}) {
  return (
    <>
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <h4>Contact Management</h4> */}
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon'/>
     
          <Link to="/"><button className='btn btn-danger'>Logout</button>  </Link>  
              </div>
    </header>
    <Outlet/>
    </>
  )
}

export default Header