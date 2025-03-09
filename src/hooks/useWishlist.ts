import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  CleanWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    dispatch(actGetWishlist("productsFullInfo"));
    return () => {
      dispatch(CleanWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((record) => ({
    ...record,
    quantity: cartItems[record.id],
    isLiked: true,
    isAuthenticated: true
  }));
  return { loading, error, records };
};

export default useWishlist;
