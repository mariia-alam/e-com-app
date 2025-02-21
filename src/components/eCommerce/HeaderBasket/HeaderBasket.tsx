import styles from "./styles.module.css"
import Logo from '@assets/svg/cart.svg?react';
// import Logo from '../../../assets/svg/cart.svg?react';

const { basketContainer, basketQuantity} = styles;

export default function HeaderBasket() {
    return (
        <div className={basketContainer}>
            <Logo />
            <div className={basketQuantity}>0</div>
        </div>
    )
}
