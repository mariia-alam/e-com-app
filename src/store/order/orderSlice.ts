import { createSlice } from "@reduxjs/toolkit";
import { Tloading, TOrder } from "@customtypes";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrder from "./act/actGetOrder";

interface IOrderSlice {
    orderList: TOrder[];
    loading:Tloading;
    error: string | null;

}
const initialState : IOrderSlice = {
    orderList:[],
    loading:"idle",
    error:null,
}
const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        resetOrderStates: (state)=>{
            state.error = null;
            state.loading = "idle";
            state.orderList = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actPlaceOrder.pending, (state)=>{
            state.error=null;
            state.loading="pending";
        });
        builder.addCase(actPlaceOrder.fulfilled, (state)=>{
            state.loading="succeeded";
            // state.order= action.payload;
        });
        builder.addCase(actPlaceOrder.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
        //get orders
        builder.addCase(actGetOrder.pending, (state)=>{
            state.error=null;
            state.loading="pending";
        });
        builder.addCase(actGetOrder.fulfilled, (state, action)=>{
            state.loading="succeeded";
            state.orderList= action.payload;
        });
        builder.addCase(actGetOrder.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
    }
})

export default orderSlice.reducer;
export {actPlaceOrder, actGetOrder};
export const {resetOrderStates} = orderSlice.actions;