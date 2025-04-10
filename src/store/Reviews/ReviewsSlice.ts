import { createSlice  } from "@reduxjs/toolkit";
import { Tloading, TReview } from "@customtypes";
import actGetReviews from "./act/actGetReviews";
import actPostReview from "./act/actPostReview";

interface IReviewState {
    reviews:TReview[]
    loading: Tloading;
    error: null | string;
}

const initialState : IReviewState = {
    reviews:[],
    loading:"idle",
    error:null
}

const reviewsSlice = createSlice({
    name:"reviews",
    initialState,
    reducers:{
        reviewsCleanup: (state)=>{
            state.reviews =[];
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetReviews.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetReviews.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.reviews = action.payload;
        });
        builder.addCase(actGetReviews.rejected , (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
            state.error = action.payload;
            }
        });
        // actPostReview
        builder.addCase(actPostReview.pending, (state) => {
            state.error = null;
        });
        builder.addCase(actPostReview.fulfilled, (state, action) => {
            state.reviews.push(action.payload);
        });
        builder.addCase(actPostReview.rejected, (state, action) => {
            // state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
})

export default reviewsSlice.reducer;
export {actGetReviews , actPostReview};
export const {reviewsCleanup} = reviewsSlice.actions
