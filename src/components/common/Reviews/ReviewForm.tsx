import { Form, Button } from "react-bootstrap";
import RatingStars from "@components/common/Reviews/RatingStars";

interface ReviewFormProps {
    rating: number | null;
    setRating: (rating: number) => void;
    comment: string;
    setComment: (comment: string) => void;
    handleSubmit: () => void;
    error?: string | null;
}

const ReviewForm = ({
    rating,
    setRating,
    comment,
    setComment,
    handleSubmit,
    error
}: ReviewFormProps) => {
    return (
        <Form className="mt-3">
            <Form.Group className="mb-3">
                <RatingStars onRate={setRating} currentRating={rating} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Write a comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" onClick={handleSubmit}>
                Submit Review
            </Button>
        </Form>
    );
};

export default ReviewForm;
