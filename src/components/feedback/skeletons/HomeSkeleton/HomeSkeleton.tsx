import { Button, Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import styles from "./styles.module.css";
import { TLoading, TProduct } from "@types";
import { useNavigate } from "react-router-dom";


const {
  homeContainer,
  welcomeSection,
  bestSellers,
  products,
  productCard,
  productInfo,
} = styles;

type HomeProps = {
  allProducts?: TProduct[];
  status?: TLoading;
};
const HomeSkeleton = ({ allProducts = [], status = "pending" }: HomeProps) => {
  const navigate = useNavigate();
  const renderSkeleton = Array(3)
    .fill(0)
    .map((_, idx) => (
      <Col
        key={idx}
        xs={12}
        sm={6}
        md={4}
        className="d-flex justify-content-center mt-5"
      >
        <ContentLoader
          speed={2}
          width={250} // العرض نفسه زي العرض في الـ .productCard
          height={350} // خلي الارتفاع يناسب الصورة والعنوان والسعر مع بعض
          viewBox="0 0 250 350" // عدل الـ viewBox علشان يكون متناسب مع الحجم
          backgroundColor="#ebebeb"
          foregroundColor="#ffffff"
        >
          <rect x="10" y="10" rx="5" ry="5" width="230" height="180" />{" "}
          {/* الصورة */}
          <rect x="10" y="200" rx="3" ry="3" width="150" height="10" />{" "}
          {/* العنوان */}
          <rect x="10" y="220" rx="3" ry="3" width="100" height="8" />{" "}
          {/* السعر */}
        </ContentLoader>
      </Col>
    ));

  return (
    <div className={homeContainer}>
      {/* قسم الترحيب */}
      <div className={welcomeSection}>
        <h1>Welcome to Our eCom</h1>
        <p>Find the best deals on top products</p>
        <Button variant="info" onClick={() => navigate("/categories")}>Shop Now</Button>
      </div>

      {/* قسم المنتجات الأكثر مبيعًا */}
      <div className={bestSellers}>
        <h2>Best Sellers</h2>
        <div className={products}>
          {status === "pending" ? (
            <Row>{renderSkeleton}</Row>
          ) : status === "succeeded" && allProducts.length > 0 ? (
            allProducts.map((product: TProduct) => (
              <div key={product.id} className={productCard}>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={productInfo}>
                  <h3>{product.title}</h3>
                  <p>{product.price} $</p>
                </div>
              </div>
            ))
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
