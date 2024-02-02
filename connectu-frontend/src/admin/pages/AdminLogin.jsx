import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./admin.login.css"
import { useDispatch } from 'react-redux';
import { adminLogin, adminLogout } from '../../store/adminAuthSlice'; // Import the adminAuthSlice

function AdminLogin() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        setLoader(true);
        e.preventDefault();
        const data = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        };
    
        axios
          .post("admin/admin_login/", data)
          .then((response) => {
            if (response.status === 200) {
              // Successful admin login
              setLoader(false);
              dispatch(adminLogin()); // Dispatch the adminLogin action without arguments
              navigate("/admin/admin_dashboard/");  // Redirect to the admin interface
            } else {
              // Admin login failed
              setLoader(false);
              console.log("Admin login failed");
            }
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
            dispatch(adminLogout()); // Dispatch the adminLogout action without arguments
          });
      }

    return (
            <div>
            <div className="container w-25">
      <div className="row">
        <div className="col-md-6 col-left">
          <div className="login-text">
            <h2>Admin Login</h2>
            {/* Your login text */}
          </div>
        </div>
        <div className="col-md-6 col-right">
          <div className="login-form">
            <h2>Admin Login</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="username">Username<span>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  ref={usernameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password<span>*</span></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

            {loader && <p>Loading...</p>}
            </div>
    );
}

export default AdminLogin;