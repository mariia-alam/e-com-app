import { useAppDispatch, useAppSelector } from '@store/hooks';
import actGetProductById from '@store/products/act/actGetProductById';
import { useParams , useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { productCleanup } from '@store/products/productsSlice';
import { actUpdateCart } from '@store/Cart/cartSlice';

const useProductDetails = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product = useAppSelector(state=>state.products.product);

    const cartItems = useAppSelector((state)=> state.cart.items);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const {accessToken:userAccessToken, user} = useAppSelector(state => state.auth)

    const [addLoading, setAddLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [comment, setComment] = useState('');
    const [showAll, setShowAll] = useState(false);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const colors = ['Black', 'Gray', 'Beige', "lightgreen"];
    const sizes = ['S', 'M', 'L', 'XL'];

    const [reviews, setReviews] = useState([
        { id: 1, user: 'Sarah', comment: 'Loved the quality!' },
        { id: 2, user: 'Ahmad', comment: 'Nice product but delivery was late.' },
        { id: 3, user: 'Lina', comment: 'Perfect fit and color!' },
        { id: 4, user: 'Omar', comment: 'Too small, order one size up.' },
        { id: 5, user: 'Maya', comment: 'Great price!' },
    ]);



    const productFullInfo = useMemo(() => ({
        ...product,
        quantity: cartItems[Number(id)] || 0,
        isLiked: wishListItemsId.includes(Number(id)),
        isAuthenticated: !!userAccessToken,
    }), [product, cartItems, id, wishListItemsId, userAccessToken]);


    const currentRemainingQuantity =( productFullInfo?.max ?? 0) - (productFullInfo?.quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;

    const addToCartHandler = useCallback(() => {
        if (!userAccessToken) {
            setShowModal(true);
        } else {
            setAddLoading(true);
            setTimeout(() => {
                dispatch(actUpdateCart({ productId: Number(id), quantity: 1, actionType: "addItem" }));
                setAddLoading(false);
            }, 500);
        }
    }, [userAccessToken, dispatch, id]);


    const handleAddComment = () => {
        if(!userAccessToken){
            setShowModal(true);
        }else{
        if (comment.trim()) {
        setReviews(prev => [
            ...prev,
            {
            id: prev.length + 1,
            user: `${user?.firstName}`,
            comment: comment,
            },
        ]);
        setComment('');
        }}
    };

    const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

    useEffect(()=>{
        if(id){
        dispatch(actGetProductById(id))
        }
        return()=> {dispatch(productCleanup())}
    },[dispatch, id])

    return {
        navigate,
        productFullInfo,
        reviews,
        comment,
        setComment,
        showAll,
        setShowAll,
        selectedColor,
        selectedSize,
        setSelectedColor,
        setSelectedSize,
        colors,
        sizes,
        handleAddComment,
        addToCartHandler,
        showModal,
        setShowModal,
        displayedReviews,
        addLoading,
        quantityReachedToMax,
        currentRemainingQuantity
    }
}
export default useProductDetails;