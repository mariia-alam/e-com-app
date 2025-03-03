import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByPrefix, productCleanup } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Tproducts } from "@customtypes/products";
import {Heading} from "@components/common";
const Products = () => {
    const cartItems = useAppSelector((state)=> state.cart.items);
    const params = useParams();

    const dispatch = useAppDispatch();

    const { loading, error, records } = useAppSelector(state => state.products);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const productsFullInfo =  records.map(el=> ({
      ...el,
      quantity:cartItems[el.id] || 0,
      isLiked: wishListItemsId.includes(el.id),
    }))

    useEffect(() => {
      dispatch(actGetProductsByPrefix(params.prefix as string));

    return () => {
      dispatch(productCleanup());
    };
  }, [dispatch, params]);





  return (
    <Container>
    <Heading><span className="text-capitalize">{params.prefix}</span> Products</Heading>
      <Loading status={loading} error={error}>
          <GridList records={productsFullInfo} renderItem={(record : Tproducts) =>
                    <Product isLiked={record.isLiked} quantity={record.quantity}  max={record.max} title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} price={record.price} {...records} />
          }/>
      </Loading>
    </Container>
  );
};

export default Products;