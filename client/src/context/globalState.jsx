import React, { createContext, useReducer } from 'react';
import AppReducer from './reducers/userreducer';
import axios from 'axios';

const initialState = {
    user: [],
    token: null,
    error: null,
    loading: true,
    onEdit: false
}

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getUser(token) {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/user/info`, {
                headers: { Authorization: token },
            });
            dispatch({
                type: 'GET_USER',
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }
    };

    async function getAllUsers() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/user`);
            console.log(res.data)
            dispatch({
                type: 'GET_ALL_USERS',
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }
    };

    async function getRefreshToken() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/user/refresh_token`);
            dispatch({
                type: 'REFRSH_TOKEN',
                payload: res.data.accesstoken
            })

        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }
    };

    async function loginSubmit(user) {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, user);
            localStorage.setItem("firstLogin", true);
            window.location.href = "/profile";
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data.user
            })
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }

    };

    async function register(user, images) {

        try {
            console.log(user)
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/register`, user );
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            })
        }

    };

    async function addProfile(user) {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/create`, user);
            window.location.href = "/";
            dispatch({
                type: 'ADD_PROFILE',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            })
        }

    }
    async function editProfile(id) {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND}/user/edit/${id}`);
            window.location.href = "/";
            dispatch({
                type: 'EDIT_PROFILE',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            })
        }
    }


    return (<GlobalContext.Provider value={{
        user: state.user,
        token: state.token,
        error: state.error,
        loading: state.loading,
        onEdit: state.onEdit,
        getUser,
        getRefreshToken,
        loginSubmit,
        register,
        addProfile,
        getAllUsers,
        editProfile
    }}>
        {children}
    </GlobalContext.Provider>)
}
