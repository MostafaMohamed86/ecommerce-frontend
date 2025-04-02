import styles from "./styles.module.css"
type ProductInfoProps = {
  title: string;
  image: string;
  price: number;
  quantity?: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
const ProductInfo = ({
  title,
  image,
  price,
  quantity,
  direction = "row",
  children,
  style,
}: ProductInfoProps) => {
  return (
  <div className={`${styles[`product-${direction}`]}`} style={style}>
  <div className={`${styles[`productImg-${direction}`]}`}>
    <img src={image} alt={title}/>
  </div>
  <div className={`${styles[`productInfo-${direction}`]}`}>
    <h2 title={title}>{title}</h2>
    <h3>{price.toFixed(2)} EGP</h3>
    {quantity && <h3>Total Quantity: {quantity}</h3>}
    {quantity && <h3>Total Price: {(quantity * price).toFixed(2)}</h3>}
    {children}
  </div>
  </div>
  )
};

export default ProductInfo;
