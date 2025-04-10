import { TReview } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";


const actPostReview = createAsyncThunk("reviews/actPostReview",
    async ({ page, review }: { page: string; review: TReview }, thunkAPI) => {

        const {rejectWithValue} = thunkAPI;

        try{
            if(page ==="about"){
                const response  = await axios.post("/appReviews",review);
                return response.data;
            }else{
                const response  = await axios.post("/productReviews",review);
                return response.data;
            }
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
})

export default actPostReview;