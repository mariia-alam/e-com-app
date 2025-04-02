import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { Input } from "@components/form";
import { Controller } from "react-hook-form";
import useCheckout from "@hooks/useCheckout";

const CheckoutOrder = () => {

    const {
        loading,
        error,
        subTotal,
        register,
        handleSubmit,
        formErrors,
        control,
        submitForm,
        paymentMethod,
        shippingOption,
        discountCode } = useCheckout();



    return (
        <div className="container mt-4">
        <h5 className="mb-4 fw-normal">Please complete all required fields to place your order</h5>
        <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
            <Col md={8}>
                {/* Shipping Information */}
                <Card className="mb-3 p-3">
                    <h4>Shipping Details</h4>
                        <Input label="Full Name" name="shippingInfo.fullName" type="text" error={formErrors.shippingInfo?.fullName?.message as string} register={register}/>
                        <Input label="Address" name="shippingInfo.address" type="text" error={formErrors.shippingInfo?.address?.message as string} register={register}/>
                        <Input label="City" name="shippingInfo.city" type="text" error={formErrors.shippingInfo?.city?.message as string} register={register}/>
                        <Input label="Country" name="shippingInfo.country" type="text" error={formErrors.shippingInfo?.country?.message as string} register={register}/>
                        <Input label="Zip Code" name="shippingInfo.zipCode" type="text" error={formErrors.shippingInfo?.zipCode?.message as string} register={register}/>
                </Card>
                {/* Payment Method */}
                <Card className="mb-3 p-3">
                    <h4>Payment Method</h4>
                        <Controller
                        defaultValue="paypal"
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.Check
                                    type="radio"
                                    label="Credit Card"
                                    {...field}
                                    value="creditCard"
                                />
                                <Form.Check
                                defaultChecked
                                    type="radio"
                                    label="PayPal"
                                    {...field}
                                    value="paypal"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery"
                                    {...field}
                                    value="cod"
                                />
                            </>
                        )}
                            />
                </Card>

            {/* Credit Card Details */}
            {paymentMethod === "creditCard" && (
                <Card className="mb-3 p-3">
                    <h4>Credit Card Information</h4>
                    <Form.Group className="mb-2">
                        <Form.Label>Card Number</Form.Label>
                        <Controller
                            defaultValue=""
                            name="cardDetails.cardNumber"
                            control={control}
                            render={({ field }) => <Form.Control isInvalid={!!formErrors.cardDetails?.cardNumber} type="password" {...field} />}
                        />
                        {formErrors.cardDetails?.cardNumber &&
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardDetails.cardNumber.message}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Expiration Date (MM/YY)</Form.Label>
                        <Controller
                            defaultValue=""
                            name="cardDetails.expirationDate"
                            control={control}
                            render={({ field }) => <Form.Control isInvalid={!!formErrors.cardDetails?.expirationDate} type="date" {...field} />}
                        />
                        {formErrors.cardDetails?.expirationDate &&
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardDetails.expirationDate.message}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>CVV</Form.Label>
                        <Controller
                        defaultValue=""
                            name="cardDetails.cvv"
                            control={control}
                            render={({ field }) => <Form.Control isInvalid={!!formErrors.cardDetails?.cvv} type="password" {...field} />}
                        />
                        {formErrors.cardDetails?.cvv &&
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardDetails.cvv.message}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Controller
                        defaultValue=""
                            name="cardDetails.cardHolder"
                            control={control}
                            render={({ field }) => <Form.Control isInvalid={!!formErrors.cardDetails?.cardHolder} type="text" {...field} />}
                        />
                        {formErrors.cardDetails?.cardHolder &&
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardDetails.cardHolder.message}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                </Card>
            )}

            {/* Shipping Options */}
            <Card className="mb-3 p-3">
                <h4>Shipping Options</h4>
                <Controller
                defaultValue="standard"
                    name="shippingOption"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Form.Check
                                type="radio"
                                label="Standard - $5"
                                {...field}
                                value="standard"
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Express - $10"
                                {...field}
                                value="express"
                            />
                        </>
                    )}
                />
            </Card>
            </Col>

            <Col md={4}>
            {/* Order Summary */}
            <Card className="p-3">
                <h4>Order Summary</h4>
                <p>Subtotal: ${subTotal}</p>
                <p>Shipping: ${shippingOption === "standard" ? "5" : "10"}</p>
                <p>Total: ${shippingOption === "standard" ? subTotal + 5 : subTotal + 10}</p>
            {/* Discount Code */}
                <Form.Group className="mb-2">
                    <Form.Label>Discount Code</Form.Label>
                    <Controller
                        name="discountCode"
                        control={control}
                        render={({ field }) => <Form.Control type="text" {...field} />}
                    />
                    <Button variant="secondary" className="mt-2" onClick={() => console.log("Applying discount code: ", discountCode)}>
                        Apply
                    </Button>
                </Form.Group>
                {!loading ? <Button variant="primary" className="mt-3 w-100" type="submit">
                Place Order
                </Button>
                :
                <Button variant="primary"><Spinner animation="border" size="sm" /> wait..</Button>
                }
                {!loading && error && <p className="text-danger m-auto mt-2">{error}</p>}
            </Card>
            </Col>

        </Row>
        </Form>
        </div>
    );
}
export default CheckoutOrder;