import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice';
import alertReducer from './alertSlice'
import postReducer from './postSlice'
import adminAuthReducer from './adminAuthSlice';

const store = configureStore({
    reducer:{
        posts:postReducer,
        auth:authReducer,
        adminAuth: adminAuthReducer,
        alert:alertReducer,
    }
})

export default store