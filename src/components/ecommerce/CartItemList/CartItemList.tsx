import { TProduct } from '@types';
import CartItem from "../CartItem/CartItem";

type CartItemProps ={
    products: TProduct[];
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id: number) => void;
};
const CartItemList = ({ products, changeQuantityHandler, removeItemHandler }:CartItemProps) => {
    const renderList = products.map((product) => (<CartItem key={product.id} {...product} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler}/>))
  return (
    <div>
      {renderList}
    </div>
  )
}

export default CartItemList
