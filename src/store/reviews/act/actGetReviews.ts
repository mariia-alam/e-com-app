import { TReview } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
type TResponse =  TReview[];



const actGetReviews = createAsyncThunk("reviews/actGetReviews",
    async(_,thunkAPI)=>{
        const {rejectWithValue , signal} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>("/reviews",
                    {signal}
                );
                return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actGetReviews;