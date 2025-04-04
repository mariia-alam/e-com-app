import { Tproducts } from "@customtypes"
import styles from "./styles.module.css"
import { Button } from "react-bootstrap";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

type SubTotalPriceProps = {products: Tproducts[], userAccessToken: string | null};

const SubTotalPrice = memo(({ products, userAccessToken } : SubTotalPriceProps) => {

    const navigate = useNavigate();

    const subTotal = products.reduce((accumulator, el)=>{
        const price = el.price
        const quantity = el.quantity

        if(quantity && typeof quantity === "number"){
        return accumulator + price * quantity;
        }else{
            return accumulator;
        }
    } , 0);



return (
    <>
        <div className={styles.container}>
            <span className="text-danger">Total Price</span>
            <span className="text-danger">{subTotal.toFixed(2)} $</span>
        </div>
        {userAccessToken && <div className={styles.container}>
            <span className="text-danger"></span>
            <span><Button onClick={()=>navigate("/checkout")} variant="danger">Proceed to Checkout</Button></span>
        </div>
        }
    </>
    )
})
export default SubTotalPrice
