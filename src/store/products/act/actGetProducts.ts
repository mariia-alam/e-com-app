import { Tproducts } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
type TResponse =  Tproducts[];

const getRandomProducts = (products: Tproducts[], count:number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const actGetProducts = createAsyncThunk("products/actGetProducts",
    async(_,thunkAPI)=>{
        const {rejectWithValue, signal} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>(`/products`,
                    {
                        signal,
                    }
                );
                const randomProducts = getRandomProducts(response.data, 27);
            return randomProducts;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actGetProducts;
