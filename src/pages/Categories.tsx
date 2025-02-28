import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Tcategory } from "@customtypes/categories";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.categories);
  console.log("render")
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);


  return (
      <Container>
        <Heading>Categories</Heading>
        <Loading status={loading} error={error}>
          <GridList records={records} renderItem={(record : Tcategory) =>
                    <Category title={record.title} img={record.img} id={record.id} prefix={record.prefix} />
          }/>
        </Loading>
      </Container>
  );
};

export default Categories;
