import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
import { RootState } from "@store/index";

const actGetCart = createAsyncThunk("cart/actGetCart",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal, getState } = thunkAPI;
        const {auth} = getState() as RootState
        try{
            const userCart = await axios.get<{ items: {[key:number]:number}}[]>(`/cart?userId=${auth.user?.id}`,{signal});
            if(!userCart.data.length){
                return {data: {} , dataType: "empty" }
            }
            return {data: userCart.data[0].items}
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));
        }
    }
)

export default actGetCart;