// Implement your WebSocket hook (e.g., useSocket.js)
import { useState, useEffect } from 'react';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/notifications/');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
