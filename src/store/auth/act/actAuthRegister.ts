import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "@util";


type TFormData = {
    firstName:string;
    lastName:string;
    email:string;
    password:string
}
const actAuthRegister = createAsyncThunk("auth/actAuthRegister",
    async(formData : TFormData, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;

        try{
            const response = await axios.post("/register", formData);
            return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error))
        }
})
export default actAuthRegister;