import { Tcategory } from "@customtypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@util";
type TResponse =  Tcategory[];



const actGetCategories = createAsyncThunk("categories/actCategories",
    async(_,thunkAPI)=>{
        const {rejectWithValue , signal} = thunkAPI;
        try{
                const response  = await axios.get<TResponse>("/categories",
                    {signal}
                );
                return response.data;
        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error));

        }
})

export default actGetCategories;