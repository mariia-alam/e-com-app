import { Tproducts } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import {AxiosErrorHandler} from "@util"
type TResponse = Tproducts[];

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems",
    async (_, thunkAPI)=>{
        const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI
        const { cart } = getState() as RootState;
        const itemsId = Object.keys(cart.items);

        try{
            if(!itemsId.length){
            return fulfillWithValue([]);
            }
            const Ids = itemsId.map(el => `id=${el}`).join("&");
            const response = await axios.get<TResponse>(`/products?${Ids}`,{signal});
            return  response.data
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
});
export default actGetProductsByItems;