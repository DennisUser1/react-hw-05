import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleMoreClick }) => {
  return (
    <div className={styles.loadMoreWrapper}>
      <button className={styles.btnShowMore} onClick={handleMoreClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;