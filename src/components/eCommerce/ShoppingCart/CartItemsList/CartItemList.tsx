import {CartItem} from "@components/eCommerce";
import { Tproducts } from "@customtypes/products";

type CartItemListProps = {
    products : Tproducts[]
    changeQuantityHandler: (id:number , quantity: number)=> void
    removeItem: (id:number) => void
};

export default function CartItemList({products, changeQuantityHandler, removeItem}: CartItemListProps) {
    const renderList = products.map((el)=>{
        return(
            <CartItem  removeItem={removeItem} changeQuantityHandler={changeQuantityHandler} key={el.id} {...el}></CartItem>
        )
    })
    return (
        <div>{renderList}</div>
    )
}
