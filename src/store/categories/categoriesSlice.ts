import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { Tloading, Tcategory } from "@customtypes";

interface IcategoriesState {
records: Tcategory[];
loading: Tloading;
error:string | null
}

const initialState: IcategoriesState = {
records:[],
loading: "idle",
error: null,
}
const categoriesSlice = createSlice({
    name:'categories',
    initialState: initialState,
    reducers:{
        cleanupCategories: (state)=>{
            state.records = [];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetCategories.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetCategories.rejected , (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
            state.error = action.payload;
            // state.error = action.payload as string; //another solution without if condition
            }
        });
    },
})

export default categoriesSlice.reducer;
export const {cleanupCategories} = categoriesSlice.actions;
export {actGetCategories}