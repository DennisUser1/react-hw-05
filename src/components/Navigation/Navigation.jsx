import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const buildNavLinkActive = ({ isActive }) => {
        return clsx(styles.link, isActive && styles.active);
    };

    return (
        <header className={styles.headerBox}>
            <NavLink to="/" className={styles.logoContainer}>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="35"
                    height="35"
                    viewBox="-330 -330 850 850"
                    className={styles.logoIcon}
                >
                    <g id="document" transform="matrix(1,0,0,1,0,0)">
                        <path
                            d="M-124.684,-140.601 C-124.684,-209.575 -180.394,-265.285 -249.368,-265.285 C-317.811,-265.285 -373.521,-209.575 -374.052,-141.132 C-373.521,-158.11 -359.726,-171.374 -342.748,-171.374 C-325.77,-171.374 -311.445,-157.579 -311.445,-140.07 C-311.445,-65.7907 -311.445,99.2166 -311.445,171.905 C-311.445,223.37 -269.53,265.285 -218.064,265.285 C-166.599,265.285 -124.684,223.37 -124.684,171.905 L-124.684,-140.601 Z"
                            fill="#fff"
                            fillOpacity="1.00"
                        />
                        <path
                            d="M124.684,-15.5581 C124.684,-84.5322 68.9741,-140.242 3.86533e-06,-140.242 C-68.4435,-140.242 -124.153,-84.5322 -124.684,-16.0887 C-124.153,-33.0669 -110.359,-46.3312 -93.3803,-46.3312 C-76.4021,-46.3312 -62.0767,-32.5363 -62.0767,-15.0275 C-62.0767,59.2523 -62.0767,224.26 -62.0767,296.948 C-62.0767,348.413 -20.1617,390.328 31.3036,390.328 C82.7689,390.328 124.684,348.413 124.684,296.948 L124.684,-15.5581 Z"
                            fill="#fff"
                            fillOpacity="1.00"
                        />
                        <path
                            d="M374.052,124.684 C374.052,55.7098 318.342,3.05747e-06 249.368,2.05249e-06 C180.924,1.05523e-06 125.215,55.7098 124.684,124.153 C125.215,107.175 139.009,93.9109 155.988,93.9109 C172.966,93.9109 187.291,107.706 187.291,125.215 C187.291,199.494 187.291,364.502 187.291,437.19 C187.291,488.655 229.206,530.57 280.671,530.57 C332.137,530.57 374.052,488.655 374.052,437.19 L374.052,124.684 Z"
                            fill="#fff"
                            fillOpacity="1.00"
                        />
                    </g>
                </svg>
                <p className={styles.logoText}>FilMovie</p>
            </NavLink>

            <nav className={styles.navigationBox}>
                <NavLink className={buildNavLinkActive} to="/">
                    Home
                </NavLink>
                <NavLink className={buildNavLinkActive} to="/movies">
                    Movies
                </NavLink>
            </nav>
        </header>
    );
};
