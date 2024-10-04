import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick}) => {
  return (
    <div className={styles.loadMoreWrapper}>
      <button className={styles.btnShowMore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;