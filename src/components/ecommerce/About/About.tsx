import { Container } from "react-bootstrap";
import styles from './styles.module.css';


const About = () => {
  return (
    <Container className={styles.aboutContainer}>
      <h1>About Our eCom</h1>
      <p>
        Welcome to Our eCom! We are committed to providing you with the best 
        products at unbeatable prices. Shop with confidence and explore our latest collections.
      </p>
    </Container>
  )
}

export default About
