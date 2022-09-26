import { Link } from "react-router-dom";
import styles from "./hero-info.module.scss";

function HeroInfo() {
  return (
    <div className={styles.hero}>
      <p className="title-main__subtext title-main__subtext--1">
        A utility payment platform
      </p>
      <h1 className={`title-main ${styles["hero__text"]}`}>
        Modern way
        <br /> empowering
        <br /> digital economy
      </h1>
      <p className="title-main__subtext title-main__subtext--2">
        All in one platform for paying utility bills and embeded
        <br /> fintech experience to grow your business.
      </p>
      <Link
        to="/auth/signup"
        className={`button button-pri ${styles["hero__action"]}`}
      >
        Try for free
      </Link>

      <div className={styles["stat"]}>
        <div className={styles["stat__data"]}>
          <p>1M+</p>
          <p>Users</p>
        </div>

        <div className={styles["stat__data"]}>
          <p>50M+</p>
          <p>Transactions</p>
        </div>

        <div className={styles["stat__data"]}>
          <p>1k+</p>
          <p>5 Star reviews</p>
        </div>
      </div>
    </div>
  );
}

export default HeroInfo;
