import { Tproducts } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";

type TResponse =  Tproducts;


const actGetProductById = createAsyncThunk("products/actGetProductById",
    async(id:string ,thunkAPI)=>{
        const {rejectWithValue, signal} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>(`/products/${id}`,
                    {
                        signal,
                    }
                );
            return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actGetProductById;
