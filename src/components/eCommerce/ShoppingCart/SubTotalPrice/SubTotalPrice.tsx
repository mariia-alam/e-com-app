import { Tproducts } from "@customtypes/products"
import styles from "./styles.module.css"

type SubTotalPriceProps = {products: Tproducts[]};

export default function SubTotalPrice({ products } : SubTotalPriceProps) {
    const subTotal = products.reduce((accumulator, el)=>{
        const price = el.price
        const quantity = el.quantity

        if(quantity && typeof quantity === "number"){
        return accumulator + price * quantity;
        }else{
            return accumulator;
        }
    } , 0)
    return (
        <div className={styles.container}>
            <span className="text-danger">Total Price</span>
            <span className="text-danger">{subTotal.toFixed(2)} $</span>
        </div>
    )
}
