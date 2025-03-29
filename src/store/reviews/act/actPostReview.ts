import { TReview } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";


const actPostReview = createAsyncThunk("reviews/actPostReview",
    async(review: TReview,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;

        try{
                const response  = await axios.post("/reviews",review);
                return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
})

export default actPostReview;