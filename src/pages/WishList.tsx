import { Heading } from "@components/common"
import { Loading, LottieHandler } from "@components/feedback";
import {GridList} from "@components/common";
import { Product } from "@components/eCommerce";
import { Tproducts } from "@customtypes";
import useWishList from "@hooks/useWishList";
export default function WishList() {
    const {loading , error , products , productsFullInfo} = useWishList();


    return (
    <>
        <Heading title="Wish List"></Heading>
            <Loading type="product" status={loading} error={error}>
                {products.length > 0?
                        <GridList records={products} renderItem={(record : Tproducts) =>
                                <Product isLiked={record.isLiked} quantity={record.quantity}  max={record.max} title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} price={record.price} {...productsFullInfo} />
                        }/>
                        :
                        <LottieHandler type="emptyWishList" message="Your wishlist is empty"></LottieHandler>
                }
            </Loading>
    </>
    )
}
