import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useAppSelector } from "@store/hooks";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";
import styles from './styles.module.css';
import HeaderCounter from "../HeaderCounter/HeaderCounter";

const { headerLeftBar } = styles

const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(state => state.wishlist.itemsId.length);
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <div className={headerLeftBar}>
    <HeaderCounter to="/wishlist" totalQuantity={wishlistTotalQuantity} svgIcon={<WishlistIcon title='Wishlist'/>} title="Wishlist"/>
    <HeaderCounter to="/cart" totalQuantity={cartTotalQuantity} svgIcon={<CartIcon title='cart'/>} title="Cart"/>
    </div>
  )
}

export default HeaderLeftBar
