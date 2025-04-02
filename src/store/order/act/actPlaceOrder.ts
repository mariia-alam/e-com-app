import axios from "axios";
import { AxiosErrorHandler } from "@util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TOrder } from "@customtypes"; // استيراد النوع TOrder

const actPlaceOrder = createAsyncThunk("order/actPlaceOrder",
    async (
        {
            shippingInfo,
            paymentMethod,
            shippingOption,
            discountCode,
            cardDetails,
            subTotal,
        }: {
            shippingInfo: TOrder['shippingInfo'];
            paymentMethod: TOrder['paymentMethod'];
            shippingOption: TOrder['shippingOption'];
            discountCode: TOrder['discountCode'];
            cardDetails: TOrder['cardDetails'];
            subTotal: number;
        },
        thunkAPI
    ) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
        ...el,
        quantity: cart.items[el.id],
    }));

    try {
        const response = await axios.post("/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subTotal: subTotal,
            shippingInfo,
            paymentMethod,
            shippingOption,
            discountCode,
            cardDetails: paymentMethod === "creditCard" ? cardDetails : null,
            date: new Date().toISOString(),
        });

    try {
        const userCart = await axios.get(`/cart?userId=${auth.user?.id}`);
        const cartId = userCart.data[0].id;
        await axios.delete(`/cart/${cartId}`);
    } catch (deleteError) {
        return rejectWithValue(AxiosErrorHandler(deleteError));
    }

        return response.data;
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error));
    }
}
);

export default actPlaceOrder;
