// bikin dulu bentuk datanya...

import  { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from  '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin'
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    user: null,
}


const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            //jika login berhasil, nanti simpan token dan user di state,
            //juga simpan token nya di localstorage
            setCredentials: (state: AuthState, action: PayloadAction<{ 
                token: string;
                user: User
                
            }>) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            },

            logout: (state: AuthState) => {
                state.token = null;
                state.user = null;
                localStorage.removeItem('token');
            }
        }
    }
);

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

