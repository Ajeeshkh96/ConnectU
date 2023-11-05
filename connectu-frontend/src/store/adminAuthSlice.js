// adminAuthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticatedAdmin: false,
  // Other admin-related data
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.isAuthenticatedAdmin = true;
      // Set other admin-related data as needed
    },
    adminLogout(state) {
      state.isAuthenticatedAdmin = false;
      // Clear other admin-related data
    },
  },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
