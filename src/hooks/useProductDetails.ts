import { useAppDispatch, useAppSelector } from '@store/hooks';
import actGetProductById from '@store/products/act/actGetProductById';
import { useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productCleanup } from '@store/products/productsSlice';

const useProductDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product = useAppSelector(state=>state.products.product);

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


    const handleAddToCart = () => {
        // dispatch add to cart logic
    };


    const handleAddComment = () => {
        if (comment.trim() !== '') {
        setReviews(prev => [
            ...prev,
            {
            id: prev.length + 1,
            user: 'Guest',
            comment: comment,
            },
        ]);
        setComment('');
        }
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
    product,
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
    handleAddToCart,
    displayedReviews
}
}
export default useProductDetails;