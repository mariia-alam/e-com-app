import { Heading } from "@components/common";
import { Table, Modal } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { OrderItems } from "@components/eCommerce";
import useOrders from "@hooks/useOrders";
import {LottieHandler} from "@components/feedback";
const Orders = () => {
    const {showModal, selectedOrder, loading, error, orderList , viewDetailHandler , closeModalHandler} = useOrders();

    return (
        <>
        <Modal  scrollable  centered  show={showModal} onHide={closeModalHandler }>
            <Modal.Header closeButton className="sticky-top bg-white">
            <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "450px" }}>{selectedOrder.map(el => {
                return (<OrderItems   key={el.id}    price={el.price} title={el.title} img={el.img} cat_prefix={el.cat_prefix} id={el.id} max={el.max} quantity={el.quantity}/>);
            })}</Modal.Body>
        </Modal>
        <Heading title="My Orders"/>
        <Loading status={loading} error={error} type="order">
            {orderList.length!==0 ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(el => (
                        <tr key={el.id}>
                            <td>#{el.id}</td>
                            <td>{el.items.length} items {" / "}
                                <span onClick={()=> viewDetailHandler(el.id)} className="text-decoration-underline" style={{ cursor: 'pointer' }}>Products Deatails</span></td>
                            <td>{el.subTotal.toFixed(2)} $</td>
                            <td>Processing | Shipped | Delivered</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            :
            <LottieHandler type="emptyList" message="No Orders" />
            }
        </Loading>

        </>
    )
}
export default Orders;