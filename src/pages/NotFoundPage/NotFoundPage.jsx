import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.fourZeroFourBg}>
            <h1 className={styles.title}>404</h1>
          </div>
          <div className={styles.contentBox404}>
            <h3 className={styles.subtitle}>Oops, looks like you're lost</h3>
            <p>The page you are looking for is not available!</p>
            <Link to="/" className={styles.link404}>Go to home</Link>
          </div>
        </div>
      </div>
    </section>
  );
};