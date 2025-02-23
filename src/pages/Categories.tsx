import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppSelector } from "@store/hooks";

const Categories = () => {
  const {loading, error ,records} = useAppSelector(state=>state.categories);

  const categoriesList =
  records.length> 0
  ? records.map((record)=>{
      return(
        <Col key={record.id} xs={4} md={3}  className="d-flex justify-content-center mb-5 mt-2">
          <Category title={record.title} img={record.img} id={record.id} prefix={record.prefix} {...records} />
        </Col>
      );
  })
  : "there are no gategories";
  return (
    <Container>
      <Row>
        {categoriesList}
      </Row>
    </Container>
  );
};

export default Categories;