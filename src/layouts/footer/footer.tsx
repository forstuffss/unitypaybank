import { Link } from "react-router-dom";
import {
  APP_ADDR,
  APP_EMAIL_ADDR,
  APP_NAME,
  APP_PHONE_NUM,
  NAV,
} from "../../util/config";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles["footer__info"]}>
        <div className={styles["footer__links"]}>
          <Link className="navi-item" to="/auth/signup">
            Sign up
          </Link>
          <Link className="navi-item" to="/auth/login">
            Login
          </Link>
          {NAV.map(({ nav, to }) => (
            <Link className="navi-item" to={to} key={nav}>
              {nav}
            </Link>
          ))}
        </div>

        <p translate="no" className={`app-icon ${styles["footer__icon"]}`}>
          {APP_NAME}
        </p>

        <div className={styles["footer__links"]}>
          <a href={`mailto:${APP_EMAIL_ADDR}`}>{APP_EMAIL_ADDR}</a>
          <a href={`tel:${APP_PHONE_NUM}`}>{APP_PHONE_NUM}</a>
          <address>{APP_ADDR}</address>
        </div>
      </div>

      <p className={styles["footer__copy"]}>
        &copy; by SirYusluv. All right reserved.
      </p>
    </footer>
  );
}

export default Footer;
