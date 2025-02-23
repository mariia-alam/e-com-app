import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppSelector } from "@store/hooks";
const Products = () => {
  // const products = useLoaderData();
  const { loading, error, records } = useAppSelector(state => state.products);


  const productsList =
  records.length> 0
  ? records.map((record)=>{
      return(
        <Col key={record.id} xs={6} md={3}  className="d-flex justify-content-center mb-5 mt-2">
          <Product price={record.price} title={record.title} img={record.img} id={record.id} cat_prefix={record.cat_prefix} {...records} />
        </Col>
      );
  })
  : "there are no products";


  return (
    <Container>
      <Row>
        {productsList}
      </Row>
    </Container>
  );
};

export default Products;