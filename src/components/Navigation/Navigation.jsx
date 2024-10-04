import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const buildNavLinkActive = ({ isActive }) => {
        return clsx(styles.link, isActive && styles.active);
    };

    return (
        <header className={styles.headerBox}>
            <p className={styles.logoBox}>FilMovi</p>
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