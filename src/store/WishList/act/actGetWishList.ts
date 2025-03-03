import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tproducts } from "@customtypes/products";

type TResponse = Tproducts[];
const actGetWishList = createAsyncThunk("wishlist/actGetWishList",
    async (_,thunkAPI) => {
        const { rejectWithValue , fulfillWithValue } = thunkAPI;
        try{
            const userWishlist = await axios.get<{ productId: number}[]>("/wishlist?userId=1");

            if(!userWishlist.data.length){
                return fulfillWithValue([]);
            }
            const concatenatedItemsId = userWishlist.data.map(el=> `id=${el.productId}`)
            .join("&");

            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`)

            return response.data
        }catch(error){
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }else{
                return rejectWithValue("An expected error")
            }
        }
    }
)

export default actGetWishList;