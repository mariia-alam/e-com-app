import { Card } from "react-bootstrap";
import { LoginModal } from "@components/common";
import  useReviews  from "@hooks/useReviews";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const Reviews = ({ page }: { page: string }) => {

    const {
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
    } = useReviews(page);

    return (
        <>
            <LoginModal
                title="Login Required"
                body="You must be logged in to leave a review"
                onClose={() => setShowModal(false)}
                show={showModal}
            />
            <Card className="mt-5">
                <Card.Body>
                    <Card.Title>Customer Reviews</Card.Title>
                    {displayedReviews.length > 0 ? (
                        <ReviewList
                            reviews={displayedReviews}
                            showAll={showAll}
                            setShowAll={setShowAll}
                        />
                    ) : (
                        <p>No reviews yet. Be the first to leave a review!</p>
                    )}
                    <hr />
                    <h5 className="mb-3">{page==="about" ? "Rate Our Service" : "Rate this product"}</h5>
                    <ReviewForm
                        rating={rating}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        handleSubmit={handleSubmit}
                        error={error}
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export default Reviews;