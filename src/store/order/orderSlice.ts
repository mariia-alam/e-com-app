import { createSlice } from "@reduxjs/toolkit";
import { Tloading, TOrder } from "@customtypes";
import actPlaceOrder from "./act/actPlaceOrder";

interface IOrderSlice {
    order: TOrder[];
    loading:Tloading;
    error: string | null;

}
const initialState : IOrderSlice = {
    order:[],
    loading:"idle",
    error:null,
}
const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        resetOrderStates: (state)=>{
            // state.error = null;
            state.loading = "idle";
            // state.order = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actPlaceOrder.pending, (state)=>{
            state.error=null;
            state.loading="pending";
        });
        builder.addCase(actPlaceOrder.fulfilled, (state, action)=>{
            state.loading="succeeded";
            state.order= action.payload;
        });
        builder.addCase(actPlaceOrder.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }

        });
    }
})

export default orderSlice.reducer;
export {actPlaceOrder};
export const {resetOrderStates} = orderSlice.actions;