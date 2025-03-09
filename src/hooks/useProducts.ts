import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useParams } from "react-router-dom";
import {
  actGetProductsSlice,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";
import { useEffect } from "react";
const useProducts = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items); // cart icon with quantity
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const productsFullInfo = records.map((record) => ({
    ...record,
    quantity: cartItems[record.id] || 0,
    isLiked: wishlistItemsId.includes(record.id),
    isAuthenticated: userAccessToken ? true : false
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetProductsSlice(params.prefix as string));
    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    };
  }, [dispatch, params]);
  return { loading, error, productsFullInfo, productPrefix };
};

export default useProducts;
