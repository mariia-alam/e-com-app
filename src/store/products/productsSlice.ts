import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByPrefix, { actGetProducts } from "./act/actGetProductsByCatPrefix";
import { Tloading, Tproducts } from "@customtypes";

interface IproductsState {
records: Tproducts[];
homeProducts : Tproducts[];
loading: Tloading;
error:string | null
}

const initialState: IproductsState = {
records:[],
homeProducts:[],
loading: "idle",
error: null,
}
const productsSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers:{
        productCleanup: (state)=>{
            state.records =[];
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
            // state.error = action.payload as string; //another solution without if condition
            }
        });
        //get random products
        builder.addCase(actGetProducts.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProducts.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.homeProducts = action.payload;
        });
        builder.addCase(actGetProducts.rejected , (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
            state.error = action.payload;
            }
        });
    },
})
export const {productCleanup} = productsSlice.actions;
export default productsSlice.reducer;
export {actGetProductsByPrefix, actGetProducts}