import {React, useState} from 'react'
import Header from '../components/includes/Header';
import Sidebar from '../components/includes/Sidebar';
import Home from '../components/includes/Home';
import { useSelector } from 'react-redux';

function AdminHome() {
  const isAuthenticatedAdmin = useSelector((state) => state.adminAuth.isAuthenticatedAdmin);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      {isAuthenticatedAdmin ? (
        <>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <Home />
        </>
      ) : null}
    </div>
  );
  
}

export default AdminHome