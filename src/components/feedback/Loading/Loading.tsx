import { Tloading } from "@customtypes"
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import {LottieHandler} from "@components/feedback"
import OrderSkeleton from "../skeletons/OrderSkeleton/OrderSkeleton";
interface LoadingProps {
  status: Tloading;
  error: null | string;
  children: React.ReactNode; // array | jsx | anything
  // type?: "cart" | "product" | "category";
  type?: keyof typeof skeletonsType;
  // children: React.JSX.Element; // send components only
}
const skeletonsType = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
  order:OrderSkeleton
}

export default function Loading( { status , error, children, type="category" }: LoadingProps ) {
  const  Component = skeletonsType[type];

  if(status === 'pending'){
      return <Component/>
    }
  if(status === 'failed' || error ){
    return(
      <LottieHandler type="error" message={error as string} ></LottieHandler>
    )
  }
  return <>{children}</>;

}
