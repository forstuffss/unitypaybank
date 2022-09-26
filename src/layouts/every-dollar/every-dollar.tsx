import { Link } from "react-router-dom";
import EveryDollarCards from "../../components/every-dollar-cards/every-dollar-cards";
import EveryDollarInfo from "../../components/every-dollar-info/every-dollar-info";

import styles from "./every-dollar.module.scss";

function EveryDollar() {
  return (
    <section className={styles["every"]}>
      <div className={styles["every__dollar"]}>
        <EveryDollarInfo />
        <EveryDollarCards />
      </div>
      <Link
        to="/auth/signup"
        className={`button button-sec ${styles["every__action"]}`}
      >
        Learn more
      </Link>
    </section>
  );
}

export default EveryDollar;
