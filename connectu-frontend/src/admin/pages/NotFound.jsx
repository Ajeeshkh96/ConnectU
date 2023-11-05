import React from "react";
import { useSelector } from 'react-redux'


import Header from "../components/includes/Header";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (!isAuthenticated){
        navigate("/admin_login")
    }

    return (
        <>
            <Header />
            <div>NotFound</div>
        </>
    );
}

export default NotFound;
