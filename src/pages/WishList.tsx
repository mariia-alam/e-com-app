import { Heading } from "@components/common"
import { Loading, LottieHandler } from "@components/feedback";
import {GridList} from "@components/common";
import { Product } from "@components/eCommerce";
import { Tproducts } from "@customtypes";
import useWishList from "@hooks/useWishList";
import { AnimatePresence, motion } from "framer-motion";

export default function WishList() {
        const {loading , error , products , productsFullInfo} = useWishList();


return (
<>
<Heading title="Wish List"></Heading>
        <Loading type="product" status={loading} error={error}>
                <AnimatePresence mode="wait">
                {products.length > 0?
                        <GridList
                        records={products}
                        renderItem={(record : Tproducts) =>
                                        <Product
                                                isAuthenticated={record.isAuthenticated}
                                                isLiked={record.isLiked}
                                                quantity={record.quantity}
                                                max={record.max}
                                                title={record.title}
                                                img={record.img}
                                                id={record.id}
                                                cat_prefix={record.cat_prefix}
                                                price={record.price}
                                                {...productsFullInfo}
                                        />
                                }/>
                                :
                        <motion.div
                        initial= {{ opacity: 0, y: 60 }}
                        animate= {{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                        exit= {{ opacity: 0, y: 60, transition: { duration: 0.4 } }}
                        >
                        <LottieHandler
                                type="emptyWishList"
                                message="Your wishlist is empty"
                        >
                        </LottieHandler>
                        </motion.div>
                }
                </AnimatePresence>
        </Loading>
</>
)
}
