type Subcategory = {
    id: number;
    title: string;
    prefix: string;
};
export type Tcategory= {
    id: number ,
    title: string ,
    prefix: string,
    subcategories?:Subcategory[],
};