import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from '../../helpers/consts';
import axios from "axios";
import { getAuthConfig } from '../../helpers/functions';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, { getState }) => {
        const { currentPage } = getState().products;
        const config = getAuthConfig();
        const { data } = await axios.get(`${API}/products/?page=${currentPage}`, config ? config : null);
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

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async ({ product, navigate }, { dispatch }) => {
        const config = getAuthConfig();
        const newProduct = new FormData();
        newProduct.append('title', product.title);
        newProduct.append('description', product.description);
        newProduct.append('price', product.price);
        newProduct.append('category', product.category);
        newProduct.append('image', product.image);
        const { data } = await axios.post(`${API}/products/`, newProduct, config ? config : null);
        dispatch(getProducts());
        return { data, navigate };
    }
);

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        const { data } = await axios.get(`${API}/category/list/`);
        return data;
    }
);