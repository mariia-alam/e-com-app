import useProductDetails from '@hooks/useProductDetails';
import { Container, Row, Col, Carousel, Form, Button,ListGroup, Card } from 'react-bootstrap';

export default function ProductDetails() {
    const {
        navigate,
        product,
        comment,
        reviews,
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
    } = useProductDetails();

return (
<Container className="my-5">
    <Row className='mb-5'>
        <Col md={6}>
            <Carousel>
                {[product?.img[0], product?.img[1]].map((img, idx) => (
                <Carousel.Item key={idx}>
                    <img
                    className="d-block w-100"
                    src={img}
                    alt={`Product ${idx + 1}`}
                    />
                </Carousel.Item>
                ))}
            </Carousel>
        </Col>

        <Col md={6} className="ps-md-5 mt-4 mt-md-1">
            <h2>{product?.title}</h2>
            <h4 className="text-muted">${product?.price.toFixed(2)}</h4>

            <Form className="mt-4">
            <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <div className="d-flex gap-3">
                    {colors.map((color) => (
                    <div
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '4px',
                        backgroundColor: color,
                        border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
                        cursor: 'pointer',
                        }}
                    />
                    ))}
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                    <div
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: selectedSize === size ? '2px solid black' : '1px solid #ccc',
                        backgroundColor: selectedSize === size ? '#f8f9fa' : 'white',
                        cursor: 'pointer',
                        minWidth: '50px',
                        textAlign: 'center',
                        fontWeight: '500'
                        }}
                    >
                        {size}
                    </div>
                ))}
            </div>
            </Form.Group>

            <p>(maximum limit is {product?.max} pieces)</p>
            <div className='d-flex flex-row gap-2 w-50'>
                <Button variant="outline-dark" className='w-75' onClick={handleAddToCart}>
                    Add to cart 🛒
                </Button>
                <Button onClick={()=>navigate(-1)} variant="dark">
                    Back
                </Button>
            </div>
        </Form>
        </Col>

    </Row>

    <Row>
    <Card className="mt-5">
        <Card.Body>
            <Card.Title>Customer Reviews</Card.Title>
                <ListGroup variant="flush" className="mb-3">
                {displayedReviews.map((review) => {
                    const firstLetter = review.user.charAt(0).toUpperCase();
                    return (
                    <ListGroup.Item
                        key={review.id}
                        className="d-flex align-items-start gap-3"
                    >
                        {/* User initial circle */}
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

                        {/* Comment content */}
                        <div className="flex-grow-1">
                        <strong>{review.user}</strong>: {review.comment}
                        </div>
                    </ListGroup.Item>
                    );
                })}
                </ListGroup>


            {reviews.length > 3 && (
            <Button
                variant="link"
                onClick={() => setShowAll(prev => !prev)}
                className="p-0 mb-3"
            >
                {showAll ? 'See less' : 'See more'}
            </Button>
            )}

            <Form>
            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Write a review</Form.Label>
                <Form.Control
                as="textarea"
                rows={2}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Your comment..."
                />
            </Form.Group>
            <Button variant="primary" onClick={handleAddComment}>
                Submit Review
            </Button>
            </Form>
        </Card.Body>
        </Card>

    </Row>
</Container>
);
};