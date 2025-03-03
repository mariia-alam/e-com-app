import { Heading } from "@components/common"
import { useEffect } from "react";
import { actGetWishList } from "@store/WishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Loading } from "@components/feedback";
import {GridList} from "@components/common";
import { Product } from "@components/eCommerce";
import { Tproducts } from "@customtypes/products";
import { productCleanup } from "@store/WishList/wishListSlice";

export default function WishList() {

    const dispatch = useAppDispatch();

    const {error, loading ,productsFullInfo } = useAppSelector(state=> state.wishlist)
    const cartItems = useAppSelector((state)=> state.cart.items);

    const products =  productsFullInfo.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: true
    }))


    useEffect(()=>{
        dispatch(actGetWishList());
        return ()=>{
            dispatch(productCleanup())
        }
    },[dispatch]);


    return (
    <>
        <Heading>Wish List</Heading>
        <Loading status={loading} error={error}>
            <GridList records={products} renderItem={(record : Tproducts) =>
                    <Product isLiked={record.isLiked} quantity={record.quantity}  max={record.max} title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} price={record.price} {...productsFullInfo} />
            }/>
        </Loading>
    </>
    )
}
