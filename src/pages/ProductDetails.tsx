import useProductDetails from '@hooks/useProductDetails';
import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import { LikeButton } from '@components/eCommerce';
import AddToCartButton from '@components/eCommerce/ShoppingCart/AddToCartButton/AddToCartButton';
import { Reviews } from '@components/common';
export default function ProductDetails() {
    const {
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
    } = useProductDetails();

return (
<Container className="my-5">

    <Row className='mb-5'>
        <Col md={6}>
            <Carousel interval={null} data-bs-theme="dark" indicators={true} >
                {productFullInfo && productFullInfo.img?.map((img, idx) => (
                <Carousel.Item key={idx}>
                    <LikeButton product={productFullInfo}/>
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
            <h2>{productFullInfo?.title}</h2>
            <h4 className="text-muted">${productFullInfo?.price?.toFixed(2)}</h4>

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

            {productFullInfo && !quantityReachedToMax
                ? <p>You can add {currentRemainingQuantity} items</p>
                : quantityReachedToMax && productFullInfo
                ? <p className="text-danger">maximum limit Reached</p>
                : null
            }
            <div className='d-flex flex-row gap-2 w-100'>
                <AddToCartButton
                    productId={productFullInfo?.id || 0}
                    isAuthenticated={productFullInfo?.isAuthenticated || false}
                    isDisabled={quantityReachedToMax}
                />
                <Button onClick={()=>navigate(-1)} variant="dark">
                    Back
                </Button>
            </div>

            </Form>
        </Col>

    </Row>

    <Row>
    <Reviews page='productDetails'/>
    </Row>
</Container>
);
};