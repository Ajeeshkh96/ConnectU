
import React from 'react'
import 
{BsGrid1X2Fill, BsFillGearFill, BsPerson, BsPeopleFill, BsImageFill}
 from 'react-icons/bs'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {adminLogout } from '../../../store/adminAuthSlice'; // Import the adminAuthSlice
import './admin.css'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdminLogout = () => {
        axios.post('admin/admin_logout/') // Replace with your actual admin logout API endpoint
          .then((response) => {
            if (response.status === 200) {
                console.log('Admin logout success');
              // Successful admin logout
              dispatch(adminLogout()); // Dispatch the adminLogout action without arguments
              navigate('/admin/login'); // Redirect to the admin login page or another appropriate location
            } else {
              // Admin logout failed
              console.log('Admin logout failed');
            }
          })
          .catch((error) => {
            // Handle logout error
            console.error('Admin logout error:', error);
            // You can show an error message or handle the error in your application as needed
          });
      };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsPerson  className='icon_header'/> Admin
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>x</span>
        </div>
        <br />
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/admin/admin_dashboard/'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
        <br />
            <li className='sidebar-list-item'>
                <Link to='/admin/user_list/'>
                    <BsPeopleFill className='icon'/> Users
                </Link>
            </li>
        <br />
            <li className='sidebar-list-item'>
                <Link to='/admin/user_list/'>
                    <BsImageFill className='icon'/> Posts
                </Link>
            </li>
        <br />
            <li className='sidebar-list-item'>
            <Link to='/admin/login' onClick={handleAdminLogout}>
            <BsFillGearFill className='icon' /> Logout
          </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar