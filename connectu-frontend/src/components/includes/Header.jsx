import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../store/authSlice";
import styles from "./header.module.css";
import home from "../../assets/icons/home.svg";
import profileUser from "../../assets/icons/profile-user.svg";
import settings from "../../assets/icons/settings.svg";
import logout from "../../assets/icons/logout.svg";
import profile from "../../assets/images/blank-profile.webp";
// import { alertActions } from "../../store/alertSlice";

function Header() {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const [viewMenu, setViewMenu] = useState(false);

    useEffect(() => {
        console.log(userData);
    }, [userData, userData?.image, userData?.username]);

    return (
        <>
            <header id={styles.header}>
                <div className={styles.wrapper}>
                    <h1>
                        <Link to="/">
                            <img
                                src={require("../../assets/icons/logo.png")}
                                alt=""
                            />
                        </Link>
                    </h1>

                    <nav className={styles.nav}>
                        <ul>
                            <li>
                                <Link to="/">
                                    <img src={home} alt="" />
                                </Link>
                            </li>

                            <li>
                                <img
                                    onClick={(e) => setViewMenu(true)}
                                    className={styles.profile}
                                    // src={profile}
                                    src={
                                        userData?.image
                                            ? userData?.image
                                            : profile
                                    }
                                    alt="profile_image"
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {viewMenu && (
                <div
                    id={styles["profile-container"]}
                    onClick={(e) => setViewMenu(false)}
                >
                    <div className={styles["menu-container"]}>
                        <ul>
                            <Link to={`/${userData?.username}`}>
                                <li>
                                    <img src={profileUser} alt="" />
                                    <span>Profile</span>
                                </li>
                            </Link>

                            <Link to={`/${userData.username}/settings/`}>
                                <li>
                                    <img src={settings} alt="" />
                                    <span>Settings</span>
                                </li>
                            </Link>
                            <li onClick={(e) => dispatch(authActions.logout())}>
                                <img src={logout} onClick={(e) => e} alt="" />
                                <span>Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
