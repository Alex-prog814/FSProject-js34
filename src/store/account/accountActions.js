import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from '../../helpers/consts';

export const registerUser = createAsyncThunk(
    'account/registerUser',
    async ({ userObj, navigate }) => {
        let formData = new FormData();
        formData.append('email', userObj.email);
        formData.append('password', userObj.password);
        formData.append('password_confirm', userObj.passwordConfirm);
        let { data } = await axios.post(`${API}/account/register/`, formData);
        return { data, navigate };
    }
);

export const loginUser = createAsyncThunk(
    'account/loginUser',
    async ({ userObj, navigate }) => {
        let formData = new FormData();
        formData.append('email', userObj.email);
        formData.append('password', userObj.password);
        let { data } = await axios.post(`${API}/account/login/`, formData);
        return { data, navigate, userEmail: userObj.email };
    }
);