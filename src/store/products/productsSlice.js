import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getOneProduct } from "./productsActions";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        oneProduct: null
    },
    reducers: {
        clearOneProductState: (state) => {
            state.oneProduct = null;
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
    }
});

export const { clearOneProductState } = productsSlice.actions;
export default productsSlice.reducer;