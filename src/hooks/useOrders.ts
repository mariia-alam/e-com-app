import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrder, resetOrderStates } from "@store/order/orderSlice";
import { Tproducts } from "@customtypes";


const useOrders = () =>{
        const [showModal , setShowModal] = useState(false);

    const [selectedOrder , setSelectedOrder] = useState<Tproducts[]>([]);

    const dispatch = useAppDispatch();

    const { loading , orderList , error } = useAppSelector( state => state.order)

    useEffect(()=>{
        const promise = dispatch(actGetOrder());
        return () => {
            promise.abort();
            dispatch(resetOrderStates());
        }
    },[dispatch]);

    const viewDetailHandler = (id:number) => {
        const selectedOrder = orderList.find(order => order.id===id);
        const selectedOrderItems = selectedOrder?.items ?? [];
        setShowModal(true);
        setSelectedOrder(prev => [...prev, ...selectedOrderItems]);
        console.log(selectedOrder)
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setSelectedOrder([]);
    }

return {showModal, selectedOrder, loading, error , viewDetailHandler , closeModalHandler, orderList}
}
export default useOrders;