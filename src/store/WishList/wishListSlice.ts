import { Tproducts, Tloading } from "@customtypes";
import { createSlice  } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishList from "./act/actGetWishList";
import { logout } from "@store/auth/authSlice";

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
            state.loading="succeeded";

            if(action.payload.dataType === "productsIds"){
                state.itemsId = action.payload.data as number[];
            }else if (action.payload.dataType==="fullInfo"){
                state.productsFullInfo = action.payload.data as Tproducts[];
            }else{
                state.productsFullInfo=[];
                state.itemsId=[];
            }
        })
        builder.addCase(actGetWishList.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
        builder.addCase(logout , (state)=>{
                state.itemsId = [];
                state.productsFullInfo = [];
        });
    }
    }
);



export {actLikeToggle, actGetWishList}
export const {productCleanup} = wishListSlice.actions;
export default wishListSlice.reducer;