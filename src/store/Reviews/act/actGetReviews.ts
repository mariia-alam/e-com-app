import { TReview } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
type TResponse =  TReview[];



const actGetReviews = createAsyncThunk("reviews/actGetReviews",
    async( { page, productId }: { page: string; productId?: number },thunkAPI )=>{
        const {rejectWithValue , signal} = thunkAPI;
        try{
            if(page==="about"){
                const response  = await axios.get<TResponse>("/appReviews",
                    {signal}
                );
                return response.data;
            }else{
                const response  = await axios.get<TResponse>(`/productReviews?productId=${productId}`,
                    {signal}
                );
                return response.data;
            }
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
})

export default actGetReviews;