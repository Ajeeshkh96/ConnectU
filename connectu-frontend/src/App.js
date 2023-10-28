import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Django API endpoint

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = () => {
    axios.post(`${API_URL}/token/`, {
      username: username,
      password: password,
    })
    .then((response) => {
      setToken(response.data.access);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Authentication</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {token && <p>Access Token: {token}</p>}
    </div>
  );
}

export default App;
