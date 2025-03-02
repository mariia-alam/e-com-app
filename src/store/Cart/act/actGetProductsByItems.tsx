import { Tproducts } from "@customtypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
type TResponse = Tproducts[];

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems",
    async (_, thunkAPI)=>{
        const { rejectWithValue, getState, fulfillWithValue } = thunkAPI
        const { cart } = getState() as RootState;
        const itemsId = Object.keys(cart.items);

        if(!itemsId.length){
            return fulfillWithValue([]);
        }
        try{
            const Ids = itemsId.map(el => `id=${el}`).join("&");
            const response = await axios.get<TResponse>(`/products?${Ids}`);
            return  response.data
        }catch(error){
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }else{
                return rejectWithValue("An expected error")
            }
        }
});
export default actGetProductsByItems;