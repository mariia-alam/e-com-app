import { Tcategory } from "@customtypes/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse =  Tcategory[];



const actGetCategories = createAsyncThunk("categories/actCategories",
    async(_,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>("/categories");
                return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message|| error.message);
            }else{
                return rejectWithValue("An unexpected error");
            }
        }
})

export default actGetCategories;