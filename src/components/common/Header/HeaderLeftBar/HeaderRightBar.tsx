import {HeaderCounter} from "@components/eCommerce";
import Cart from "@assets/svg/cart.svg?react"
import Like from "@assets/svg/like-black.svg?react"
import { useAppSelector } from "@store/hooks";
import getCartTotalQuantitySelector from "@store/Cart/selectors";
import styles from "./styles.module.css"

export default function HeaderRightBar() {
    const CartTotalQuantity = useAppSelector((state)=> getCartTotalQuantitySelector(state));
    const WishListTotalQuantity = useAppSelector((state)=> state.wishlist.itemsId.length);

return (
    <div className={styles.svgContainer}>
        <HeaderCounter page="/wishlist" svgIcon={<Like className={styles.logo}/>} totalQuantity={WishListTotalQuantity}></HeaderCounter>
        <HeaderCounter page="/cart" svgIcon={<Cart className={styles.logo}/>} totalQuantity={CartTotalQuantity}></HeaderCounter>
    </div>
)
}
