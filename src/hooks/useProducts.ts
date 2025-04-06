import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByPrefix, productCleanup } from "@store/products/productsSlice";
import { useEffect  } from "react";
import { useParams } from "react-router-dom";


export default function useProducts() {

    const params = useParams();
    const prefix = params.prefix;
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state)=> state.cart.items);
    const { loading, error, records } = useAppSelector(state => state.products);
    const { records:categoriesRecords } = useAppSelector(state => state.categories);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const userAccessToken = useAppSelector(state => state.auth.accessToken)

    const productsFullInfo =  records.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: wishListItemsId.includes(el.id),
        isAuthenticated:userAccessToken ? true : false,
        }))


useEffect(() => {
    if (!prefix) return;
    const promise = dispatch(actGetProductsByPrefix(params?.prefix as string));
    return () => {
        promise.abort();
        dispatch(productCleanup());
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch, prefix]);


    return {loading, error , prefix , productsFullInfo , categoriesRecords}
}
