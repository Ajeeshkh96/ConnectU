import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserList.css"

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/admin/UserList/') // Replace with your actual API endpoint URL
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleStatusUpdate = (userId) => {
    // Toggle user status and update the backend
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.is_active = !user.is_active;
        axios.put(`/admin/UserStatusUpdate/${userId}/`) // Replace with your actual API endpoint URL
          .then((response) => {
            console.log('User status updated successfully');
          })
          .catch((error) => {
            console.error('Error updating user status:', error);
          });
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <div>
      <table className='user-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Options</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.is_active ? (
                  <button className='btn-success' type='button' onClick={() => handleStatusUpdate(user.id)}>Block</button>
                ) : (
                  <button className='btn-danger' type='button' onClick={() => handleStatusUpdate(user.id)}>Unblock</button>
                )}
              </td>
              {user.is_active ? <td>Active</td> : <td>Inactive</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
