import { CircleLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader () {
  return (
        <div className={styles.loaderWrapper}>
          <CircleLoader
            size={80}   
            color="orange"
            aria-label="circle-loading"
          />
        </div>
    );
};