import DisplayCard from "../display-card/display-card";
import styles from "./hero-card.module.scss";

function HeroCard() {
  return (
    <div className={`${styles["hero-card"]}`}>
      <div className={styles["bg-circle"]}>
        <DisplayCard />
      </div>
    </div>
  );
}

export default HeroCard;
