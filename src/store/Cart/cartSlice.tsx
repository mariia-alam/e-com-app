import { Tproducts } from "@customtypes";
import { createSlice  } from "@reduxjs/toolkit";
import getCartTotalQuantitySelector from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { Tloading } from "@customtypes";

interface ICartState {
    items:{ [key:string] : number };
    productsFullInfo: Tproducts[];
    loading: Tloading;
    error: null | string;
}
const initialState : ICartState = {
    items:{},
    productsFullInfo:[],
    loading:"idle",
    error:null
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const id = action.payload;
            if(state.items[id]){
                state.items[id]++;
            }else{
                    state.items[id] = 1;
                }
            },
        cartItemChangeQuantity: (state, action) => {
                state.items[action.payload.id] = action.payload.quantity
            },
        removeCartItem: (state, action) => {
                delete state.items[action.payload];
                state.productsFullInfo = state.productsFullInfo.filter((el)=> el.id !== action.payload)
            },
        cleanupCartProductsFullInfo: (state) => {
            state.productsFullInfo = []
        }
        },
    extraReducers:(builder)=>{
        builder.addCase(actGetProductsByItems.pending, (state)=>{
            state.loading="pending";
            state.error = null;
        })
        builder.addCase(actGetProductsByItems.fulfilled, (state, action)=>{
            state.loading="succeeded";
        // state.productFullInfo = Array.isArray(action.payload) ? action.payload : [action.payload]; 
            state.productsFullInfo = action.payload;
        })
        builder.addCase(actGetProductsByItems.rejected, (state, action)=>{
            state.loading ="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
            state.error = ""
        })
    }
    }
);




export {getCartTotalQuantitySelector , actGetProductsByItems};
export const {addToCart, cartItemChangeQuantity , removeCartItem, cleanupCartProductsFullInfo} = cartSlice.actions;
export default cartSlice.reducer;