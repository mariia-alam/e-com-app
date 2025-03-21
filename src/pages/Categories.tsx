import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Tcategory } from "@customtypes";
import useCategories from "@hooks/useCategories";

const Categories = () => {

  const {loading, error, records} = useCategories();

  return (
      <Container>
        <Heading title="Categories"></Heading>
        <Loading type="category" status={loading} error={error}>
          <GridList
            emptyMessage="There are no categories"
            records={records}
            renderItem={(record : Tcategory) =>
                    <Category
                      title={record.title}
                      img={record.img}
                      id={record.id}
                      prefix={record.prefix} />
          }/>
        </Loading>
      </Container>
  );
};

export default Categories;
