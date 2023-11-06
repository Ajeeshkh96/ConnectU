import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

function UserPost() {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handleRemovePost = (postId) => {
    axios
      .delete(`/admin/UserPostDelete/${postId}/`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });

  };
  console.log(posts);

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
            
            <td><img src={post.image} alt="Image" width="100"/></td>
            <td>

                <Button color='danger' onClick={() => handleRemovePost(post.id)}>
                  Remove
                </Button>

            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default UserPost;
