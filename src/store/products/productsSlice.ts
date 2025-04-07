import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByPrefix from "./act/actGetProductsByCatPrefix";
import actGetProducts from "./act/actGetProducts";
import actGetProductById from "./act/actGetProductById";
import { Tloading, Tproducts } from "@customtypes";

interface IproductsState {
    records: Tproducts[];
    allProducts : Tproducts[];
    product:Tproducts | null;
    loading: Tloading;
    error:string | null
}

const initialState: IproductsState = {
    records:[],
    allProducts:[],
    product:null,
    loading: "idle",
    error: null,
}
const productsSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers:{
        productsCleanup: (state)=>{
            state.records =[];
            state.loading= "idle";
            state.error= null;
        },
        productCleanup: (state)=>{
            state.product =null;
            state.loading= "idle";
            state.error= null;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetProductsByPrefix.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductsByPrefix.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetProductsByPrefix.rejected , (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
            state.error = action.payload;
            }
        });
        //get random products
        builder.addCase(actGetProducts.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProducts.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.allProducts = action.payload;
        });
        builder.addCase(actGetProducts.rejected , (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
            state.error = action.payload;
            }
        });
        // get product details
        builder.addCase(actGetProductById.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });

        builder.addCase(actGetProductById.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.product = action.payload;
        });

        builder.addCase(actGetProductById.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
})

export const {productsCleanup , productCleanup} = productsSlice.actions;
export default productsSlice.reducer;
export {actGetProductsByPrefix, actGetProducts}