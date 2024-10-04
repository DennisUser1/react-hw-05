import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>

          <div className={styles.boxTV}>
            <div className={styles.contentTV}>
              <div className={styles.iconTV}></div> 
            </div>
            <div className={styles.fuzzyOverlay}></div> 
          </div>
          <div className={styles.fourZeroFourBg}></div>
          <div className={styles.contentBox404}>
            <h3 className={styles.subtitle}>Oops, looks like you're lost</h3>
            <p className={styles.text}>The page you are looking for is not available!</p>
            <Link to="/" className={styles.link404}>Go to home</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
