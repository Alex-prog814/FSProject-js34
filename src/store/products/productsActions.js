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
        const config = getAuthConfig();
        const { data } = await axios.get(`${API}/products/${id}`, config ? config : null);
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

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ product, navigate }, { dispatch }) => {
        const config = getAuthConfig();
        const updatedProduct = new FormData();
        updatedProduct.append('title', product.title);
        updatedProduct.append('description', product.description);
        updatedProduct.append('category', product.category);
        updatedProduct.append('price', product.price);
        if(typeof(product.image) === 'object') {
            updatedProduct.append('image', product.image);
        };
        const { data } = await axios.patch(`${API}/products/${product.id}/`, updatedProduct, config);
        dispatch(getProducts());
        return { data, navigate };
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({ id }, { dispatch }) => {
        const config = getAuthConfig();
        const { data } = await axios.delete(`${API}/products/${id}/`, config);
        dispatch(getProducts());
        return { data };
    }
);

export const createReview = createAsyncThunk(
    'products/createReview',
    async ({ text, productId }) => {
        const config = getAuthConfig();
        const newReview = new FormData();
        newReview.append('text', text);
        newReview.append('product', productId);
        const { data } = await axios.post(`${API}/reviews/`, newReview, config);
        return { data };
    }
);

export const deleteReview = createAsyncThunk(
    'products/deleteReview',
    async ({ reviewId, productId }, { dispatch }) => {
        const config = getAuthConfig();
        const { data } = await axios.delete(`${API}/reviews/${reviewId}/`, config);
        dispatch(getOneProduct({ id: productId }));
        return { data };
    }
);

export const getFavorites = createAsyncThunk(
    'products/getFavorites',
    async () => {
        const config = getAuthConfig();
        const { data } = await axios.get(`${API}/favorites/`, config);
        return { data };
    }
);

export const toggleFavorite = createAsyncThunk(
    'products/toggleFavorite',
    async ({ productId }, { dispatch }) => {
        const config = getAuthConfig();
        const { data } = await axios.get(`${API}/products/${productId}/toggle_favorites/`, config);
        dispatch(getOneProduct({ id: productId }));
        dispatch(getFavorites());
        return { data };
    }
);