import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/ordersSlice";
const useCart = () => {
  const dispatch = useAppDispatch();
  const MAX_LIMIT = 50;
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  const products = productsFullInfo.map((product) => ({
    ...product,
    quantity: items[product.id],
    max: Math.min(product.rating?.count || 10, MAX_LIMIT),
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
      dispatch(resetOrderStatus()) // when moving from page to another
    };
  }, [dispatch]);
  return {
    loading,
    error,
    products,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCart;
