import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from '../../helpers/consts';
import axios from "axios";
import { getAuthConfig } from '../../helpers/functions';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const config = getAuthConfig();
        const { data } = await axios.get(`${API}/products/`, config ? config : null);
        return data;
    }
);

export const getOneProduct = createAsyncThunk(
    'products/getOneProduct',
    async ({ id }) => {
        const { data } = await axios.get(`${API}/products/${id}`);
        return data;
    }
);