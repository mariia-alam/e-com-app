import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Tproducts } from "@customtypes";
import {Heading} from "@components/common";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const {loading , prefix , productsFullInfo , error, records} = useProducts();
  // console.log("render Products page");
  return (
    <Container>
    <Heading title={prefix?.toUpperCase() + " Products"}></Heading>
      <Loading type="product" status={loading} error={error}>
          <GridList emptyMessage="There are no products in this category" records={productsFullInfo} renderItem={(record : Tproducts) =>
                    <Product isLiked={record.isLiked} quantity={record.quantity}  max={record.max} title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} price={record.price} {...records} />
          }/>
      </Loading>
    </Container>
  );
};

export default Products;