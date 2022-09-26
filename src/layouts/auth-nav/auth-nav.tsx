import { NavLink } from "react-router-dom";
import styles from "./auth-nav.module.scss";

function AuthNav() {
  return (
    <div className={styles.auth}>
      <nav className={styles["auth__navi"]}>
        <NavLink
          to="/auth/signup"
          className={({ isActive }) =>
            `navi-item${isActive ? " navi-item--active" : ""}`
          }
        >
          SIGNUP
        </NavLink>
        <div className={styles["auth__delimeter"]}></div>
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            `navi-item${isActive ? " navi-item--active" : ""}`
          }
        >
          LOGIN
        </NavLink>
      </nav>
    </div>
  );
}

export default AuthNav;
