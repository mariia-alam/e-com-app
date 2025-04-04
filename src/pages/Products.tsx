import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Tproducts } from "@customtypes";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const {loading , productsFullInfo, error, records} = useProducts();
  return (
    <div>
      <Loading type="product" status={loading} error={error}>

            <GridList
            emptyMessage="There are no products in this category"
            records={productsFullInfo}
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
                      price={record.price} {...records} />
            }/>
      </Loading>
    </div>
  );
};

export default Products;