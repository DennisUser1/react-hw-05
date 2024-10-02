import { CircleLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader ({ isLoading }) {
  return isLoading ? (
        <div className={styles.loaderWrapper}>
          <CircleLoader
            size={80}   
            color="orange"
            ariaLabel="circle-loading"
          />
        </div>
    ) : null;
};