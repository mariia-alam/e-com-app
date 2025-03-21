import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "@util";
import { RootState } from "@store/index";

type TActProps = {
    productId: number;
    quantity?: number;
    actionType: "removeItem" | "updateQuantity" | "addItem";
};

const actUpdateCart = createAsyncThunk(
    "cart/actUpdateCart",
    async ({ productId, quantity = 1, actionType }: TActProps, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { auth } = getState() as RootState;
        const userId = auth.user?.id;

        try {
            // ✅ احصل على بيانات السلة للمستخدم
            const response = await axios.get(`/cart?userId=${userId}`);
            const cartData = response.data.length > 0 ? response.data[0] : null;

            if (!cartData) {
                // ✅ إذا لم تكن هناك سلة، أنشئ واحدة جديدة
                await axios.post(`/cart`, {
                    userId,
                    items: { [productId]: quantity },
                });
                return { type: "addItem", product: { productId, quantity } };
            }

            const cartId = cartData?.id;
            if (!cartId) {
                return rejectWithValue("Cart ID is missing");
            }

            if (actionType === "addItem") {
                // ✅ إضافة منتج أو زيادة الكمية
                const newQuantity = (cartData.items[productId] || 0) + quantity;
                await axios.put(`/cart/${cartId}`, {
                    userId,
                    items: { ...cartData.items, [productId]: newQuantity }
                });

                return { type: "addItem", product: { productId, quantity: newQuantity } };
            }

            if (actionType === "updateQuantity") {
                // ✅ تحديث الكمية فقط
                await axios.put(`/cart/${cartId}`, {
                    userId,
                    items: { ...cartData.items, [productId]: quantity }
                });

                return { type: "updateQuantity", product: { productId, quantity } };
            }

            if (actionType === "removeItem") {
                // ✅ حذف المنتج فقط
                const updatedItems = { ...cartData.items };
                delete updatedItems[productId];

                if (Object.keys(updatedItems).length === 0) {
                    await axios.delete(`/cart/${cartId}`);
                    return { type: "deleteCart", product: { productId } };
                } else {
                    await axios.put(`/cart/${cartId}`, { userId, items: updatedItems });
                    return { type: "removeItem", product: { productId } };
                }
            }
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error));
        }
    }
);
export default actUpdateCart;