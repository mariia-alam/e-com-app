import { useAppDispatch, useAppSelector } from '@store/hooks';
import actGetProductById from '@store/products/act/actGetProductById';
import { useParams , useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { productCleanup } from '@store/products/productsSlice';

const useProductDetails = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product = useAppSelector(state=>state.products.product);

    const cartItems = useAppSelector((state)=> state.cart.items);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const {accessToken:userAccessToken} = useAppSelector(state => state.auth)

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const colors = ['Black', 'Gray', 'Beige'];
    const sizes = ['S', 'M', 'L', 'XL'];

    const productFullInfo = useMemo(() => {
        if (!product) {
            return;
        }
        return {
            ...product,
            quantity: cartItems[product.id],
            isLiked: wishListItemsId.includes(product.id),
            isAuthenticated: userAccessToken ? true : false,
        };
    }, [product, cartItems, wishListItemsId, userAccessToken]);


    const currentRemainingQuantity =( productFullInfo?.max ?? 0) - (productFullInfo?.quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;


    useEffect(()=>{
        if(id){
        dispatch(actGetProductById(id))
        }
        return()=> {dispatch(productCleanup())}
    },[dispatch, id])

    return {
        navigate,
        productFullInfo,
        selectedColor,
        selectedSize,
        setSelectedColor,
        setSelectedSize,
        colors,
        sizes,
        quantityReachedToMax,
        currentRemainingQuantity
    }
}
export default useProductDetails;