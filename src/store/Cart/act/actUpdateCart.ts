import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
import { RootState } from "@store/index";

type TActProps = {
    productId:number;
    quantity?:number;
    actionType: "removeItem" | "updateQuantity" | "addItem";
}
const actUpdateCart = createAsyncThunk("cart/actUpdateCart",
    async ({ productId, quantity, actionType }: TActProps, thunkAPI) => {

        const {rejectWithValue, getState} = thunkAPI;
        const {auth} = getState() as RootState;
        const userId = auth.user?.id


        try{
            const response = await axios.get(`/cart?userId=${userId}`);
            const cartData = response.data.length > 0 ? response.data[0] : null;

            let updatedCart;
            let updatedItems = cartData ? { ...cartData.items } : {};

            if (!cartData) {
                updatedCart = await axios.post(`/cart`,{userId:userId, items:{[productId]: quantity}})
                updatedItems = updatedCart.data.items;
                return {type:"addItem", items: updatedCart.data.items}
            }else{
                const cartId = cartData.id;
                if (actionType === "addItem") {
                        //if product exist update quantity
                        if (updatedItems[productId]) {
                            updatedItems[productId] += quantity;
                        } else {
                            updatedItems[productId] = quantity
                        }
                        updatedCart = await axios.put(`/cart/${cartId}`, { userId, items: updatedItems });
                        return {type:"addItem", items: updatedCart.data.items}
                }else if (actionType === "updateQuantity") {
                        updatedItems[productId] = quantity;
                        updatedCart = await axios.put(`/cart/${cartId}`, { userId, items: updatedItems });
                        return {type:"updateQuantity", items: updatedCart.data.items}
                } else if(actionType === "removeItem") {
                        delete updatedItems[productId];
                        if (Object.keys(updatedItems).length === 0) {
                                await axios.delete(`/cart/${cartId}`);
                                return { type: "deleteCart", items: {} };
                            } else {
                                updatedCart = await axios.put(`/cart/${cartId}`, { userId, items: updatedItems });
                                return { type: "removeItem", items: updatedCart.data.items };
                            }
                        }
                    }
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
    })

export default actUpdateCart;