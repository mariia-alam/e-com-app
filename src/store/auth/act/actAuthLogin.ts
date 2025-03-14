import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "@util";


type TFormData = {
    email:string;
    password:string;
}

type TResponse = {
    accessToken:string;
    user: {
        id:number;
        firstName:string;
        lastName:string;
        email:string;
    };
}
const actAuthLogin = createAsyncThunk("auth/actAuthLogin",
    async(formData : TFormData, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;

        try{
            const response = await axios.post<TResponse>("/login", formData);
            console.log(response.data)
            return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error))
        }
})
export default actAuthLogin;