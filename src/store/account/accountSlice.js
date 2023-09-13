import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from './accountActions';

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
    }
});

export const { clearCurrentAccount, clearStatus } = accountSlice.actions;
export default accountSlice.reducer;