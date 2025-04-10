import { TReview } from "@customtypes";
import { ListGroup, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

interface ReviewListProps {
    reviews: TReview[];
    showAll: boolean;
    setShowAll: (show: boolean) => void;
}

const ReviewList = ({ reviews, showAll, setShowAll }: ReviewListProps) => {
    return (
        <>
            <ListGroup variant="flush" className="mb-3">
                {reviews.map((review, index) => {
                    const firstLetter = review.userName.charAt(0).toUpperCase();
                    return (
                        <ListGroup.Item key={index} className="d-flex align-items-start gap-3">
                            <div
                                className="d-flex justify-content-center align-items-center flex-shrink-0"
                                style={{
                                    backgroundColor: '#ccc',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '18px',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {firstLetter}
                            </div>
                            <div className="flex-grow-1">
                                <strong>{review.userName}</strong>
                                <div>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={16} color={i < review.rate ? "#ffc107" : "#e4e5e9"} />
                                    ))}
                                </div>
                                <div>{review.comment}</div>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            {reviews.length > 3 && (
                <Button variant="link" onClick={() => setShowAll(!showAll)} className="p-0 mb-3">
                    {showAll ? 'See less' : 'See more'}
                </Button>
            )}
        </>
    );
};

export default ReviewList;
