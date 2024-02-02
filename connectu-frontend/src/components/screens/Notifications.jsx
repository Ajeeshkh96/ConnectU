import {React, useEffect} from 'react'
import { useSelector } from "react-redux";
import useSocket from '../../config/useSocket';

import axios from "../../config/axiosConfig";
import styled from "styled-components";



function Notifications() {
  const socket = useSocket();
  const access = useSelector((state) => state.auth.token.access);


  const config = {
    headers: {
        authorization: `Bearer ${access}`,
    },
};

  useEffect(() => {

    axios
        .get("users/ws/notifications/", config)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

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

  return (
        <>
            <MainWrapper>
                <h1>Notifications</h1>
            </MainWrapper>
            
        </>
  )
}

export default Notifications



const MainWrapper = styled.div`
    padding-top: 100px;
    width: 70%;
    margin: 0 auto;
    h1 {
        text-align: center;
    }
`;