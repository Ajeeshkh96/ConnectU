import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import axios from "../../config/axiosConfig";
import profile from "../../assets/images/blank-profile.webp";
import settings from "../../assets/icons/settings.svg";
import { authActions } from "../../store/authSlice";
import { alertActions } from "../../store/alertSlice";
import MainLoader from "../UI/MainLoader";

function Profile() {
    const access = useSelector((state) => state.auth.token.access);
    const userData = useSelector((state) => state.auth.userData);

    const [userObject, setUserObject] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    

    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const config = {
        headers: {
            authorization: `Bearer ${access}`,
        },
    };


    useEffect(() => {
        console.log(username);
        axios
            .get(`users/${username}/`, config)
            .then((res) => {
                console.log(res.data);
                setIsLoading(false);
                if (res.data.statusCode !== 6001) {
                    setUserObject(res.data.data);
                } else {
                    navigate("/");
                    dispatch(
                        alertActions.addAlert({
                            type: "err",
                            message: "Page not found",
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 401) {
                    dispatch(authActions.logout());
                }
            });
    }, [username, userData]);

    return (
        <>
            <Helmet>
                <title>{username}</title>
            </Helmet>
            {isLoading ? (
                <MainLoader/>
            ) : (
                <>
                    <TopWrapper>
                        <TopLeft className="left">
                            <img
                                src={
                                    userObject?.image
                                        ? userObject?.image
                                        : profile
                                }
                                alt=""
                            />
                        </TopLeft>
                        <TopRight className="right">
                            <NameContainer>
                                <h3>{userObject?.user?.username}</h3>
                            
                                    <Link to="settings/">
                                        <img src={settings} alt="" />
                                    </Link>
                 
                            </NameContainer>

                            <Bio>
                                <h4>{userObject.name}</h4>
                                {userObject.bio && <p>{userObject.bio}</p>}
                            </Bio>
                        </TopRight>
                    </TopWrapper>
                
                </>
            )}
            <Outlet />
        </>
    );
}

export default Profile;

const TopWrapper = styled.div`
    max-width: 750px;
    margin: 0 auto;
    margin-top: 64px;
    display: flex;
    align-items: center;
    padding-top: 40px;
`;

const TopLeft = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 130px;
        border-radius: 50%;
        padding: 5px;
        border: 2px solid #99999938;
        cursor: pointer;
    }
`;
const TopRight = styled.div`
    width: 50%;
`;
const NameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;

    img {
        width: 26px;
        cursor: pointer;
    }
    h3 {
        font-size: 24px;
        color: #676767;
    }
    span.btn {
        padding: 6px 18px;
        border-radius: 5px;
        background: #0095f6;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        &.unfollow {
            background: none;
            border: 1px solid #9999997e;
            color: #444444;
        }
    }
`;

const Bio = styled.div`
    h4 {
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 18px;
    }
    p {
        line-height: 24px;
        font-size: 17px;
        letter-spacing: 0.5px;
    }
`;


