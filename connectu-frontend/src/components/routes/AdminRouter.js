import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../../admin/pages/AdminLogin";
import AdminHome from "../../admin/pages/AdminHome";
import UserListPage from "../../admin/pages/UserListPage";
import UserPostPage from "../../admin/pages/UserPostPage";

function AdminRouter() {
    return (
        <>
            <Routes>
              <Route path="login/" element={<AdminLogin />} />
              <Route path="admin_dashboard/" element={<AdminHome />} />
              <Route path="user_list/" element={<UserListPage />} />
              <Route path="user_post/" element={<UserPostPage />} />
            </Routes>
        </>
    );
}

export default AdminRouter;
