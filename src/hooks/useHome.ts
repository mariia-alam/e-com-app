import { useNavigate } from "react-router-dom";
import {  useAppDispatch, useAppSelector } from "@store/hooks";
import { useState, useEffect, useMemo } from "react";
import { actGetProducts, allProductsCleanup } from "@store/products/productsSlice";


const useHome = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {allProducts} = useAppSelector(state=>state.products)
    const token = useAppSelector(state => state.auth.accessToken);
    const cartItems = useAppSelector((state)=> state.cart.items);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const menProducts = useMemo(() => allProducts.filter(product => product.cat_prefix === "men"), [allProducts]);
    const womenProducts = useMemo(() => allProducts.filter(product => product.cat_prefix === "women"), [allProducts]);

    const first10Men = useMemo(() => menProducts.slice(0, 10), [menProducts]);
    const first10Women = useMemo(() => womenProducts.slice(0, 10), [womenProducts]);

    const womenProductsFullInfo =  first10Women.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: wishListItemsId.includes(el.id),
        isAuthenticated:token ? true : false,
    }))
    const menProductsFullInfo =  first10Men.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: wishListItemsId.includes(el.id),
        isAuthenticated:token ? true : false,
    }))

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isSmallScreen = windowWidth <= 576;
    const isMedScreen = windowWidth > 576 && windowWidth <= 768;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(()=>{
        dispatch(actGetProducts());
        return ()=> { dispatch(allProductsCleanup()); }
    },[dispatch])

    return {
        womenProductsFullInfo,
        menProductsFullInfo,
        isSmallScreen,
        isMedScreen,
        token,
        navigate,
    }
}

export default useHome;