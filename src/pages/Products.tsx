import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByPrefix, productCleanup } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Tproducts } from "@customtypes/products";
const Products = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { loading, error, records } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(actGetProductsByPrefix(params.prefix as string));

    return () => {
      dispatch(productCleanup());
    };
  }, [dispatch, params]);





  return (
    <Container>
      <Loading status={loading} error={error}>
          <GridList records={records} renderItem={(record : Tproducts) =>
                    <Product title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} price={record.price} {...records} />
          }/>
      </Loading>
    </Container>
  );
};

export default Products;