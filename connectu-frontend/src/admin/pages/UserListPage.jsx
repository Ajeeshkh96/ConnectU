import {React, useState} from 'react'
import Header from '../components/includes/Header';
import Sidebar from '../components/includes/Sidebar';
import UserList from '../components/UserList/UserList';
import { useSelector } from 'react-redux';


function UserListPage() {
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
          <UserList />
        </>
      ) : <h1>Please Login</h1>}
    </div>
  )
}

export default UserListPage