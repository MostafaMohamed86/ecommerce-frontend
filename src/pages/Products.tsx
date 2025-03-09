import Product from "@components/ecommerce/Product/Product"
import { Container } from "react-bootstrap"
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TProduct } from '@types';
import useProducts from "@hooks/useProducts";


const Products = () => {
  
  const {loading, error, productsFullInfo, productPrefix} = useProducts();
  return (
    <Container>
      <Heading title={`${productPrefix?.toUpperCase()} Products`}/>
      <Loading status={loading} error={error} type="product">
      <GridList<TProduct> 
      emptyMessage= "there are no products"
      records={productsFullInfo} 
      renderItem= {(record) => <Product {...record}/>}/>
      </Loading>
    </Container>
  )
}

export default Products
