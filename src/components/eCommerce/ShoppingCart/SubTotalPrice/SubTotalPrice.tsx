import { Tproducts } from "@customtypes"
import styles from "./styles.module.css"
import { Button, Modal, Spinner } from "react-bootstrap";
import { memo, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import {actPlaceOrder} from "@store/order/orderSlice";
import { clearCartAfterPlaceOrder } from "@store/Cart/cartSlice";

type SubTotalPriceProps = {products: Tproducts[], userAccessToken: string | null};

const SubTotalPrice = memo(({ products, userAccessToken } : SubTotalPriceProps) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const [loading, setloading] = useState(false);
    const [error , setError] = useState<string | null>(null);

    const subTotal = products.reduce((accumulator, el)=>{
        const price = el.price
        const quantity = el.quantity

        if(quantity && typeof quantity === "number"){
        return accumulator + price * quantity;
        }else{
            return accumulator;
        }
    } , 0);

    const handleSubmit =  async () =>{
        setloading(true)
        dispatch(actPlaceOrder(subTotal)).unwrap().then(()=>{
            dispatch(clearCartAfterPlaceOrder());
            setShowModal(false);
        }).catch((error)=>{
            setError(error);
        }).finally(()=>{
            setloading(false);
        });
    }

    const modalHandler = () => {
        setShowModal(!showModal);
        setError(null);
    }

return (
    <>
        <Modal  centered show={showModal} backdrop="static" onHide={modalHandler}>
            <Modal.Header closeButton>
            <Modal.Title>Placing Order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>Are you sure you want to place order with total price:</p>
            <p className="text-danger fw-bold">{subTotal.toFixed(2)} $ </p>
            {!loading && error && <p className="text-danger">{error}</p>}
            </Modal.Body>

            <Modal.Footer>
            <Button variant="danger"  onClick={()=> setShowModal(false)}>Cancel</Button>
            {!loading ?
                <Button variant="success" onClick={handleSubmit} >Confirm</Button>
                : <Button variant="outline-success"><Spinner animation="border" size="sm" /> wait..</Button>
            }
            </Modal.Footer>
        </Modal>
        <div className={styles.container}>
            <span className="text-danger">Total Price</span>
            <span className="text-danger">{subTotal.toFixed(2)} $</span>
        </div>
        {userAccessToken && <div className={styles.container}>
            <span className="text-danger"></span>
            <span><Button onClick={()=>setShowModal(true)} variant="danger" className="text-white">Place Order</Button></span>
        </div>
        }
    </>
    )
})
export default SubTotalPrice
