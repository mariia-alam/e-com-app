import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tproducts } from "@customtypes";
import {AxiosErrorHandler} from "@util";
import { RootState } from "@store/index";

type TResponse = Tproducts[];

type TDataType = "fullInfo" | "productsIds";

const actGetWishList = createAsyncThunk("wishlist/actGetWishList",
    async (dataType : TDataType , thunkAPI) => {
        const { rejectWithValue, signal, getState } = thunkAPI;
        const {auth} = getState() as RootState
        try{
            const userWishlist = await axios.get<{ productId: number}[]>(`/wishlist?userId=${auth.user?.id}`,{signal});

            if(!userWishlist.data.length){
                return {data: [] , dataType: "empty" }
            }

            if(dataType === "productsIds"){
                const concatenatedItemsId = userWishlist.data.map(el=> el.productId);
                return {data: concatenatedItemsId , dataType: "productsIds" }
            }else{
                const concatenatedItemsId = userWishlist.data.map(el=> `id=${el.productId}`)
                .join("&");
                const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`,{signal})
                return {data: response.data , dataType: "fullInfo" }
            }

        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
    }
)

export default actGetWishList;