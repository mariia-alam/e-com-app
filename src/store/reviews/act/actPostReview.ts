import { TReview } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
import { RootState } from "@store/index";


const actPostReview = createAsyncThunk("reviews/actPostReview",
    async(review: TReview,thunkAPI)=>{
        const {rejectWithValue, getState} = thunkAPI;
        const {auth} =  getState() as RootState;

        try{
                const response  = await axios.post("/reviews",review);
                return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actPostReview;