import { Tproducts } from "@customtypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse =  Tproducts[];



const actGetProductsByPrefix = createAsyncThunk("products/actGetProductsByPrefix",
    async(prefix: string ,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`);
                return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message|| error.message);
            }else{
                return rejectWithValue("An unexpected error");
            }
        }
})

export default actGetProductsByPrefix;
