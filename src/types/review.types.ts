
export type TReview = {
    userId:number | undefined;
    productId?:number;
    userName:string;
    rate:number;
    comment:string;
}