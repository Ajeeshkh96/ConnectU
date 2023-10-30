import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import axios from "../../config/axiosConfig";
import { Helmet } from "react-helmet";
import { postActions } from "../../store/postSlice";
import Loader from "../UI/Loader";


function Home() {
    const access = useSelector((state) => state.auth.token.access);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [isLoading, setIsLoading] = useState(false);
    const [isEmptyPost, setIsEmptyPost] = useState(false);

    const config = {
        headers: {
            authorization: `Bearer ${access}`,
        },
    };


    return (
        <>
            {isLoading && <Loader />}
            <Helmet>
                <title>ConnectU</title>
            </Helmet>
            <Outlet />
        </>
    );
}

export default Home;

const MainWrapper = styled.div`
    width: 40%;
    margin: 100px auto 0;
    /* margin-top: 63px; */
    background: #f0f0f0;

    ${props => props.empty && css`
        background: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
    `}

    a {
        color: red;
    }
    .emptyPost {
        text-align: center;
        h1 {
            margin-bottom: 24px;
            font-weight: 600;
            color:#4f4d4d;
        }
        a {
            color: #111;
            background:#0095f6;
            color:#fff;
            padding:10px 20px;
            font-weight: 600;
            border-radius:7px;
        }
    }
`;
