import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Loading } from "@components/feedback";
import { actGetAllProducts, cleanUpAllProducts } from "@store/products/productsSlice";

import HomeComponent from "@components/ecommerce/HomeComponent/HomeComponent";



const Home = () => {
  const dispatch = useAppDispatch();
  const { error, loading, allProducts } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    const promise = dispatch(actGetAllProducts());
    return () => {
      promise.abort();
      dispatch(cleanUpAllProducts());
    };
  }, [dispatch]);
  return (
    <>
      <Loading status={loading} error={error} type="category">
        <HomeComponent allProducts={allProducts} />
      </Loading>
    </>
  );
};

export default Home;
