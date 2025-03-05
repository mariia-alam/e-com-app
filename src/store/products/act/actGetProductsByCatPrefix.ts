import { Tproducts } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
type TResponse =  Tproducts[];



const actGetProductsByPrefix = createAsyncThunk("products/actGetProductsByPrefix",
    async(prefix: string ,thunkAPI)=>{
        const {rejectWithValue, signal} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`,
                    {
                        signal,
                    }
                );
                return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actGetProductsByPrefix;
