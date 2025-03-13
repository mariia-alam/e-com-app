import { Tproducts } from "./products.types";

export type TOrder = {
    id:number;
    userId:number;
    subTotal:number;
    items:Tproducts[]
}