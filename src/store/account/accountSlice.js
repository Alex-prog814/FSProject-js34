import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from './accountActions';
import { addDataToLocalStorage, updateToken } from "../../helpers/functions";

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        currentAccount: null,
        status: ''
    },
    reducers: {
        clearCurrentAccount: (state) => {
            state.currentAccount = null;
        },
        clearStatus: (state) => {
            state.status = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.fulfilled, (_, action) => {
            action.payload.navigate('/login');
        })
        .addCase(registerUser.rejected, (state) => {
            state.status = 'error';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.currentAccount = action.payload.userEmail;
            addDataToLocalStorage(action.payload.userEmail, action.payload.data);
            updateToken();
            action.payload.navigate('/');
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = 'error';
        })
    }
});

export const { clearCurrentAccount, clearStatus } = accountSlice.actions;
export default accountSlice.reducer;