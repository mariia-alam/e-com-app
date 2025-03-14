import { createSlice } from "@reduxjs/toolkit";
import {Tloading} from "@customtypes"
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthState {
    accessToken:string | null;
    user: {
        id:number;
        firstName:string;
        lastName:string;
        email?:string;
    } | null;
    loading: Tloading;
    error: string | null;
}

const initialState: IAuthState = {
    user:null,
    accessToken:null,
    loading:"idle",
    error:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetUi: (state) =>{
            state.loading="idle";
            state.error=null;
        },
        logout: (state) =>{
            state.loading="idle";
            state.error=null;
            state.user=null;
            state.accessToken=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actAuthRegister.pending, (state)=>{
            state.loading="pending";
            state.error=null;
        });
        builder.addCase(actAuthRegister.fulfilled, (state)=>{
            state.loading = "succeeded";
        });
        builder.addCase(actAuthRegister.rejected, (state, action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });

        //login
        builder.addCase(actAuthLogin.pending,(state)=>{
            state.loading="pending";
            state.error=null
        });
        builder.addCase(actAuthLogin.fulfilled,(state, action)=>{
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(actAuthLogin.rejected,(state,action)=>{
            state.loading="failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });
    },
})

export {actAuthRegister, actAuthLogin}
export const {resetUi , logout}  = authSlice.actions;
export default authSlice.reducer;