import styles from "./balance-card.module.scss";

type IProps = {
  icon: string;
  title: string;
  balance: string;
  extraClases?: string;
};

function BalanceCard({ icon, balance, title, extraClases }: IProps) {
  return (
    <div className={`${styles["card"]} ${extraClases ? extraClases : ""}`}>
      <img alt={title} src={icon} className={styles["card__icon"]} />

      <div className={`card-title ${styles["card__info"]}`}>
        <p className={styles["card__title"]}>{title}</p>

        <div className={styles["card__cash"]}>
          <p className={styles["card__money"]}>{balance}</p>
          <p className={styles["card__currency"]}>USD</p>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
