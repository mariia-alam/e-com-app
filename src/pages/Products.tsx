import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Tproducts } from "@customtypes";
import useProducts from "@hooks/useProducts";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useMemo, memo } from "react";
import {Product} from "@components/eCommerce";


const Products =  memo ( () => {

  const { prefix, subcategory } = useParams();
  const {loading , productsFullInfo, error, categoriesRecords} = useProducts();


  const filteredProducts = useMemo(() => {
    return subcategory
      ? productsFullInfo.filter((product) => product.subcategory === subcategory)
      : productsFullInfo;
  }, [subcategory, productsFullInfo]);



  return (
    <div>
      <Loading type="product" status={loading} error={error}>
      {categoriesRecords
        .filter((cat) => cat.prefix === prefix && cat.subcategories && cat.subcategories.length > 0)
        .map((cat) => (
          <Navbar expand="lg" className="shadow-sm fw-semibold px-2 bg-transparent fs-6" key={cat.id}>
            <Nav className="me-auto">
              {cat.subcategories && cat.subcategories.map((subcat) => (
                  <Nav.Link
                  as={Link}
                  to={`/categories/products/${prefix}/${subcat.prefix}`}
                  active={subcategory === subcat.prefix}
                  key={subcat.id}>
                    {subcat.title}
                  </Nav.Link>
              ))}
            </Nav>
          </Navbar>
      ))}

            <GridList
            // key={subcategory}
            emptyMessage="There are no products in this category"
            records={filteredProducts}
            renderItem={ (record: Tproducts) =>
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
              />
            }/>
      </Loading>
    </div>
  );
});

export default Products;