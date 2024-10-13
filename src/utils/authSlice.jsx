
import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, JWTtoken: null, error: null },
    reducers: {
        setCredentials: (state, { payload: user }) => {
            try {
                // Save the JWT in session storage
                const token = jwtDecode(user.token);
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('encodedToken', user.token);
                localStorage.setItem('name', user.name);

                state.user = user;
                state.JWTtoken = JSON.stringify(token);
            } catch (e) {
                console.log(e);
                // What to do here?
            }
        },
        unsetCredentials: (state) => {
            try {
                // log the user out by unsetting everything
                localStorage.removeItem('token');
                localStorage.removeItem('encodedToken');
                localStorage.removeItem('name');
                localStorage.removeItem("addPopup");

                state.user = null;
                state.JWTtoken = null;
            } catch (e) {
                console.log(e);
                // What to do here?
            }
        },
        setFeatures: (state, { payload: { features } }) => {
            try {
                localStorage.setItem('features', JSON.stringify(features));

                state.features = features;
            } catch (e) {
                console.log(e);
            }
        },
    },
});

export const { setCredentials, unsetCredentials, setFeatures } = slice.actions;

export default slice.reducer;

export const selectJWTtoken = (state) => state.auth.JWTtoken;
export const selectedUser = (state) => state.auth.user;