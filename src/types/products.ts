export type Tproducts= {
    id: number ,
    title: string ,
    cat_prefix: string,
    img: string,
    price:number,
    quantity?:number;
    max:number;
    isLiked: boolean;
};