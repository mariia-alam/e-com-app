import { Tproducts } from "@customtypes/products";
import { createSlice  } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishList from "./act/actGetWishList";
import { Tloading } from "@customtypes/shared";

interface IWishListState {
    itemsId:number[];
    productsFullInfo: Tproducts[];
    error: null | string;
    loading: Tloading;

}
const initialState : IWishListState = {
    itemsId:[],
    productsFullInfo:[],
    error:null,
    loading:"idle"
}
const wishListSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        productCleanup: (state)=>{
            state.productsFullInfo =[];
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(actLikeToggle.pending, (state)=>{
            state.error = null;
        })
        builder.addCase(actLikeToggle.fulfilled, (state, action)=>{
            if(action.payload.type==="add"){
                state.itemsId.push(action.payload.id)
            }else{
                state.itemsId = state.itemsId.filter((el)=> el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(el=> el.id!== action.payload.id)
            }
        })
        builder.addCase(actLikeToggle.rejected, (state, action)=>{
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
        //get wishlist items
        builder.addCase(actGetWishList.pending, (state)=>{
            state.error = null;
            state.loading = "pending";
        })
        builder.addCase(actGetWishList.fulfilled, (state, action)=>{
            state.productsFullInfo = action.payload;
            state.loading="succeeded";
        })
        builder.addCase(actGetWishList.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
    }
    }
);



export {actLikeToggle, actGetWishList}
export const {productCleanup} = wishListSlice.actions;
export default wishListSlice.reducer;