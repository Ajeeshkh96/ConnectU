import { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import useSocket from '../../../config/useSocket';

function UserPost() {
  const [posts, setPosts] = useState([]);
  const socket = useSocket();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = (postId) => {
    setSelectedPostId(postId);
    setShowConfirmation(true);
  };

  useEffect(() => {
    fetchPosts();

    // Listen for WebSocket notifications
    if (socket) {
      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        // Handle the notification data
        console.log('Notification:', data.message);
      });
    }

    return () => {
      // Cleanup code if needed
    };

  }, [socket]);

  const fetchPosts = () => {
    axios
      .get("/admin/UserPost/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleRemovePost = () => {
    axios
      .delete(`/admin/UserPostDelete/${selectedPostId}/`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPostId));
        handleCloseConfirmation();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className='container-fluid m-5'>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Post</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>{post.username}</td>
              <td>{post.email}</td>
              <td><img src={post.image} alt="" width="100" /></td>
              <td>
                <Button color='danger' onClick={() => handleShowConfirmation(post.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemovePost}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPost;
