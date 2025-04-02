import { Tproducts } from "./products.types";

export type TOrder = {
    id:number;
    userId:number;
    subTotal:number;
    items:Tproducts[],
    shippingInfo: {
        fullName: string;
        address: string;
        city: string;
        country: string;
        zipCode: string;
    },
    cardDetails?: {
        cardNumber: string;
        expirationDate: string;
        cvv: string;
        cardHolder: string;
    },
    paymentMethod: string,
    shippingOption:string,
    discountCode?:string,

}