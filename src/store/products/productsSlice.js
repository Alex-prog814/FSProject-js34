import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getOneProduct, createProduct, getCategories, updateProduct } from "./productsActions";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        oneProduct: null,
        currentPage: 1,
        totalPages: 1,
        categories: []
    },
    reducers: {
        clearOneProductState: (state) => {
            state.oneProduct = null;
        },
        changePage: (state, action) => {
            state.currentPage = action.payload.page;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.results;
            state.totalPages = Math.ceil(action.payload.count / 6);
        })
        .addCase(getProducts.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getOneProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(getOneProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.oneProduct = action.payload;
        })
        .addCase(getOneProduct.rejected, (state) => {
            state.loading = false;
        })
        .addCase(createProduct.fulfilled, (_, action) => {
            action.payload.navigate('/');
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload.results;
        })
        .addCase(updateProduct.fulfilled, (_, action) => {
            action.payload.navigate('/');
        })
    }
});

export const { clearOneProductState, changePage } = productsSlice.actions;
export default productsSlice.reducer;