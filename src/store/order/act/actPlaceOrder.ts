import axios from "axios";
import { AxiosErrorHandler } from "@util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk("odrer/actPlaceOrder",

    async (subtotal: number, thunkAPI ) => {
        const { rejectWithValue , getState } = thunkAPI;
        const {cart, auth} =  getState() as RootState;

        const orderItems = cart.productsFullInfo.map(el=>({
            ...el,
            quantity:cart.items[el.id],
        }));

        try{
            const response = await axios.post("/orders",{
                userId: auth.user?.id,
                items:orderItems,
                subTotal:subtotal,
            });
            return response.data;
        }catch(error){
        return rejectWithValue(AxiosErrorHandler(error))
    }
    }
)

export default actPlaceOrder;