import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";
const Cart = () => {
  const {
    loading,
    error,
    products,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length > 0 ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            type="success"
            message="Your order has been placed successfully."
            className="mb-5"
          />
        ) : (
          <LottieHandler
            type="empty"
            message="Your cart is empty"
            className="mb-5"
          />
        )}
      </Loading>
    </>
  );
};

export default Cart;
