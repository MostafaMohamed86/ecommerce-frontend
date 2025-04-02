import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { useAppDispatch } from "@store/hooks";
import { memo, useEffect, useState } from "react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import ProductInfo from "../ProductInfo/ProductInfo";
import { addToast } from "@store/toasts/toastSlice";
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    image,
    rating,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);

    const [isBtnDisabled, setISBtnDisabled] = useState(false); // useEffect Action

    const [isLoading, setIsLoading] = useState(false);

    const max = rating?.count ?? 0;
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity == 0 ? true : false;

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      dispatch(
        addToast({
          title: "Add to Cart",
          type: "success",
          message: `item ${title} added to cart`,
          onCloseToast: () => {
            console.log("fire");
          }
        })
      );

      if (currentRemainingQuantity - 1 == 0) {
        dispatch(
          addToast({
            type: "warning",
            message: `you've reached to max from item: ${title}`,
            delayAppearance: true,
          })
        );
        setISBtnDisabled(true);
      }
      setISBtnDisabled(true);
    };

    useEffect(() => {
      if (!isBtnDisabled) return;
      const debounce = setTimeout(() => {
        setISBtnDisabled(false);
        clearTimeout(debounce);
      }, 300);
    }, [isBtnDisabled]);

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => {
              setIsLoading(false);
              if (!isLiked)
                dispatch(
                  addToast({
                    type: "success",
                    message: `item ${title} added to your wishlist`,
                  })
                );
            })
            .catch(() => {
              dispatch(
                addToast({
                  title: "unable to add item",
                  type: "danger",
                  message: `there is an error to add to wishlist`,
                })
              );
              setIsLoading(false);
            });
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo title={title} price={price} image={image}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You've reached to max"
              : `you can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Add To Cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
