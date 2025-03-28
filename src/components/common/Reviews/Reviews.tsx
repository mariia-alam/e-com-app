import { Card, Form, Button } from "react-bootstrap";
import { useMemo, useCallback, useState, useRef } from "react";
import {RatingStars} from "@components/common";
import { useAppSelector } from "@store/hooks";
import { FaStar } from "react-icons/fa";
import {LoginModal} from "@components/common";

interface Review {
    rating: number;
    comment: string;
    userName:string;
}

const review = [
    {
        rating:3,
        comment:"Amazing quality and fast delivery! Highly recommended",
        userName:"Sarah Wilson"
    },
    {
        rating:4,
        comment:"I love the unique designs! Will definitely shop again",
        userName:"John dev"
    }
]


const Reviews = () => {
    const [showModal, setShowModal] = useState(false);


    console.log("review")

    const firstName = useAppSelector(state=>state.auth.user?.firstName)
    const lastName = useAppSelector(state=>state.auth.user?.lastName)
    const token = useAppSelector(state=>state.auth.accessToken)

    const [rating, setRating] = useState<number | null>(null);
    const commentRef = useRef<HTMLTextAreaElement | null>(null);


    const [userName, setUserName] = useState<string>(`${firstName} ${lastName}`);
    const [reviews, setReviews] = useState<Review[]>(review);

    const handleRate = useCallback((newRating: number) => {
        setRating(newRating);
    }, []);



const handleSubmit = () => {
    if(!token){
        setShowModal(true);
        return;
    }
    const commentValue = commentRef.current?.value;

    if (rating && commentValue && userName) {
        setReviews((prevReviews) => [...prevReviews, { rating, comment: commentValue, userName }]);
        setRating(null);
        setUserName(`${firstName} ${lastName}`);

        if (commentRef.current) {
            commentRef.current.value = "";
        }
    }
};


    const memoizedReviews = useMemo(() => {
    return reviews.map((review, index) => (
        <Card key={index} className="p-1 mb-3 w-75 m-auto">
        <Card.Body>
            <div className="d-flex align-items-center justify-content-center gap-2">
            <h5 className="mt-2">{review.userName}</h5>
            <div>
                {[...Array(5)].map((_ , i) => (
                <FaStar key={i} size={20} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                ))}
            </div>
            </div>
            <Card.Text className="mt-2">{review.comment}</Card.Text>
        </Card.Body>
        </Card>
    ));
}, [reviews]);


return(
    <>
    <LoginModal onClose={()=> setShowModal(false)} show={showModal}/>

    <h2>What Our Customers Say</h2>
    {reviews.length > 0 ? memoizedReviews : (
        <p>No reviews yet. Be the first to leave a review!</p>
    )}
    <h2>Rate Our Service</h2>
    <RatingStars onRate={handleRate} currentRating={rating} />

    <Form className="mt-3 w-75 m-auto">
        <Form.Group>
        <Form.Label>Leave a Comment</Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            defaultValue=""
            ref={commentRef}
        />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleSubmit}>Submit</Button>
    </Form>
    </>
);

}

export default Reviews
