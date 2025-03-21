import { Tproducts } from "@customtypes";
import { createSlice  } from "@reduxjs/toolkit";
import getCartTotalQuantitySelector from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { Tloading } from "@customtypes";
import actUpdateCart from "./act/actUpdateCart";
import { logout } from "@store/auth/authSlice";
import actGetCart from "./act/actGetCart";

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
        cleanupCartProductsFullInfo: (state) => {
            state.productsFullInfo = []
        },
        clearCartAfterPlaceOrder: (state) => {
            state.productsFullInfo = [];
            state.items = {};
        }
        },
        //get cart products full info when open cart page
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
        });

        //update Cart ( add remove -- ++ )
        builder.addCase(actUpdateCart.pending, (state)=>{
            state.error = null;
        })
        builder.addCase(actUpdateCart.fulfilled, (state, action)=>{
            if (action.payload?.type === "addItem") {
                    state.items[action.payload.product.productId] = action.payload.product.quantity;
                } else if (action.payload?.type === "updateQuantity") {
                    state.items[action.payload.product.productId] = action.payload.product.quantity;
                } else if (action.payload?.type === "removeItem") {
                    delete state.items[action.payload.product.productId];
                    state.productsFullInfo = state.productsFullInfo.filter(
                        (el) => el.id !== action.payload?.product.productId
                    );
                } else if (action.payload?.type === "deleteCart") {
                    state.items = {};
                    state.productsFullInfo = [];
                }
        })
        builder.addCase(actUpdateCart.rejected, (state, action)=>{
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
        //get cart items noly after login
        builder.addCase(actGetCart.pending, (state)=>{
            state.error = null;
            state.loading = "pending";
        })
        builder.addCase(actGetCart.fulfilled, (state, action)=>{
            state.loading="succeeded";
            state.items = action.payload.data;
        })
        builder.addCase(actGetCart.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
        //logout listen
        builder.addCase(logout , (state)=>{
        state.items = {};
        state.productsFullInfo = [];
        });
    }
    }
);




export {getCartTotalQuantitySelector , actGetProductsByItems, actUpdateCart, actGetCart};
export const { cleanupCartProductsFullInfo, clearCartAfterPlaceOrder} = cartSlice.actions;
export default cartSlice.reducer;