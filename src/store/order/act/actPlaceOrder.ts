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
            //delete the cart
            try {
                const userCart = await axios.get(`/cart?userId=${auth.user?.id}`);
                const cartId = userCart.data[0].id;
                await axios.delete(`/cart/${cartId}`);
            } catch (deleteError) {
            return rejectWithValue(AxiosErrorHandler(deleteError));
            }
            return response.data;
        }catch(error){
        return rejectWithValue(AxiosErrorHandler(error))
    }
    }
)

export default actPlaceOrder;