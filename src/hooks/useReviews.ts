import { useState, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetReviews, actPostReview, reviewsCleanup } from "@store/Reviews/ReviewsSlice";
import { useParams } from "react-router-dom";

const useReviews = (page: string) => {
    const dispatch = useAppDispatch();
    const prefix = useParams();
    const { error, reviews } = useAppSelector((state) => state.reviews);
    const userId = useAppSelector((state) => state.auth.user?.id);
    const token = useAppSelector((state) => state.auth.accessToken);

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');
    const [showAll, setShowAll] = useState(false);

    const userName = useAppSelector((state) => `${state.auth.user?.firstName} ${state.auth.user?.lastName}`);

    const handleSubmit = () => {
        if (!token) {
            setShowModal(true);
            return;
        }

        if (rating && comment.trim() && userName) {
            const reviewData = page === "about"
                ? { userId, userName, rate: rating, comment }
                : { userId, userName, rate: rating, comment, productId: Number(prefix.id) };

            dispatch(actPostReview({ page, review: reviewData }));
            setRating(null);
            setComment('');
        }
    };

    const displayedReviews = useMemo(() => {
        const sortedReviews = [...reviews].reverse();
        return showAll ? sortedReviews : sortedReviews.slice(0, 3);
    }, [showAll, reviews]);

    useEffect(() => {
        dispatch(actGetReviews({ page, productId: page !== "about" ? Number(prefix.id) : undefined }));
        return () => {
            dispatch(reviewsCleanup());
        };
    }, [dispatch, page, prefix]);

    return {
        showModal,
        setShowModal,
        rating,
        setRating,
        comment,
        setComment,
        showAll,
        setShowAll,
        handleSubmit,
        error,
        displayedReviews,
    };
};

export default useReviews;
