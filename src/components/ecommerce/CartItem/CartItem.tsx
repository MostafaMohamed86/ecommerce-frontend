import { Button, Form } from 'react-bootstrap';
import styles from './styles.module.css';
import { TProduct } from '@types';
import { memo } from 'react';
import ProductInfo from '../ProductInfo/ProductInfo';

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
const CartItem = memo(({ id ,title, price, image, max, quantity, changeQuantityHandler, removeItemHandler }: CartItemProps) => {
    const { cartItem, cartItemSelection} = styles;
    console.log(max);
    const renderOptions = Array(max)
    .fill(0)
    .map((_, idx) => {
      const quantity = ++idx;
      return <option value={quantity} key={quantity}>{quantity}</option>
    });
    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    }
  return (
    <div className={cartItem}>
      <ProductInfo title={title} price={price} image={image} direction="column">
        <Button variant="secondary" style={{color: "white", width: "100px"}} className='mt-auto' onClick={() => removeItemHandler(id)}>Remove</Button>
        </ProductInfo>
      
      <div className={cartItemSelection}>
        <span className='d-block mb-1'>Quantity</span>
        <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
        </Form.Select>
      </div>
    </div>
  )
})

export default CartItem
