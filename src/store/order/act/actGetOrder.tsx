import axios from "axios";
import { AxiosErrorHandler } from "@util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TOrder } from "@customtypes";

type TResponse = TOrder[];

const actGetOrder = createAsyncThunk("odrer/actGetOrder",

    async (_, thunkAPI ) => {
        const { rejectWithValue , getState, signal } = thunkAPI;
        const {auth} =  getState() as RootState;

        try{
            const response = await axios.get<TResponse>(`/orders?userId=${auth.user?.id}`
                ,{ signal });
            return response.data;

        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error))
        }
    }
)

export default actGetOrder;