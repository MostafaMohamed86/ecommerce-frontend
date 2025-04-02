import { TProduct } from "@types";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const {
  homeContainer,
  welcomeSection,
  bestSellers,
  products,
  productCard,
  productInfo
} = styles;

type HomeComponentProps = {
    allProducts: TProduct[]
}
const HomeComponent = ({ allProducts }: HomeComponentProps) => {
    const navigate = useNavigate();
  return (
    <div className={homeContainer}>
      {/* قسم الترحيب */}
      <div className={welcomeSection}>
        <h1>Welcome to Our eCom</h1>
        <p>Find the best deals on top products</p>
        <Button onClick={() => navigate("/categories")} variant="info">Shop Now</Button>
      </div>

      {/* قسم المنتجات الأكثر مبيعًا */}
      <div className={bestSellers}>
        <h2>Best Sellers</h2>
        <div className={products}>
          {allProducts.length > 0 ? allProducts.map((product: TProduct) => (
            <div key={product.id} className={productCard}>
              <div>
                <img src={product.image} alt={product.title} />
              </div>
              <div className={productInfo}>
                <h3>{product.title}</h3>
                <p>{product.price} $</p>
              </div>
            </div>
          )) : ""}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
