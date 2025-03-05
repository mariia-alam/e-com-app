import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tproducts } from "@customtypes";
import {AxiosErrorHandler} from "@util";

type TResponse = Tproducts[];
const actGetWishList = createAsyncThunk("wishlist/actGetWishList",
    async (_,thunkAPI) => {
        const { rejectWithValue , fulfillWithValue, signal } = thunkAPI;
        try{
            const userWishlist = await axios.get<{ productId: number}[]>("/wishlist?userId=1",{signal});

            if(!userWishlist.data.length){
                return fulfillWithValue([]);
            }
            const concatenatedItemsId = userWishlist.data.map(el=> `id=${el.productId}`)
            .join("&");

            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`,{signal})

            return response.data
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
    }
)

export default actGetWishList;