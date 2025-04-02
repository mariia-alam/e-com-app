import { useState, useEffect } from "react";
import { actPlaceOrder } from "@store/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {  clearCartAfterPlaceOrder } from "@store/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { checkoutSchema, CheckoutType } from "@validation/checkoutSchema";
import { useForm, SubmitHandler} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { actGetProductsByItems, cleanupCartProductsFullInfo } from "@store/Cart/cartSlice";

const useCheckout = () =>{

    const [loading, setloading] = useState(false);
    const [error , setError] = useState<string | null>(null);


    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { items, productsFullInfo} = useAppSelector((state) => state.cart)
    const products = productsFullInfo.map((el)=> ({...el, quantity: items[el.id] }));

    //subtotal price
    const subTotal = products.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        return quantity && typeof quantity === "number" ? accumulator + price * quantity : accumulator;
    }, 0);


    const { register, handleSubmit ,formState:{errors: formErrors}, control, watch } = useForm<CheckoutType>(
        {
        mode:"onChange",
        resolver: zodResolver(checkoutSchema)},
    );

    const paymentMethod = watch("paymentMethod");
    const shippingOption = watch("shippingOption");
    const discountCode = watch("discountCode");

    const shippingCost = shippingOption === "standard" ? 5 : 10;
    const totalPrice = subTotal + shippingCost;

    const submitForm : SubmitHandler<CheckoutType> = async (data) => {
        setloading(true)
        dispatch(
        actPlaceOrder({
            shippingInfo:data.shippingInfo,
            paymentMethod:data.paymentMethod,
            shippingOption:data.shippingOption,
            discountCode:data.discountCode,
            cardDetails:data.cardDetails,
            subTotal:totalPrice,
        })).unwrap().then(()=>{
            dispatch(clearCartAfterPlaceOrder())
            navigate("/cart");
        })
        .catch((error)=>{
            setError(error.message);
        }).finally(()=>{
            setloading(false);
        });
    }


    useEffect(()=>{
        const promise = dispatch(actGetProductsByItems());
        return ()=>{
            promise.abort();
            dispatch(cleanupCartProductsFullInfo());
        }
    },[dispatch]);

    return{
            loading,
            error,
            subTotal,
            register,
            handleSubmit,
            formErrors,
            control,
            submitForm,
            paymentMethod,
            shippingOption,
            discountCode
    }
}
export default useCheckout;