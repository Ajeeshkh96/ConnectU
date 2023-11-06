import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

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
    <div className='container-fluid m-5'>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.is_active ? 'Active' : 'Inactive'}</td>
            <td>
              {user.is_active ? (
                <Button color='danger' onClick={() => handleStatusUpdate(user.id)}>
                  Block
                </Button>
              ) : (
                <Button color='success' onClick={() => handleStatusUpdate(user.id)}>
                  Unblock
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default UserList;
