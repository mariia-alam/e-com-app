import { Tloading } from "@customtypes"
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import {LottieHandler} from "@components/feedback"
import OrderSkeleton from "../skeletons/OrderSkeleton/OrderSkeleton";
interface LoadingProps {
  status: Tloading;
  error: null | string;
  children: React.ReactNode; // array | jsx | anything
  type?: keyof typeof skeletonsType;
}
const skeletonsType = {
  product: ProductSkeleton,
  cart: CartSkeleton,
  order:OrderSkeleton
}

export default function Loading( { status , error, children, type="product" }: LoadingProps ) {
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
