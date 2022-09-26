import styles from "./every-dollar-card.module.scss";

type IProps = {
  amount: string;
  detail: string;
  time: string;
  active: boolean;
  extraClasses?: string;
};

function EveryDollarCard({
  amount,
  detail,
  time,
  active,
  extraClasses,
}: IProps) {
  return (
    <div
      className={`${styles["card"]}${
        active ? " " + styles["card--active"] : ""
      } ${extraClasses}`}
    >
      <p className={styles["card__detail"]}>{detail}</p>
      <p className={styles["card__time"]}>{time}</p>
      <p className={styles["card__amount"]}>{amount}</p>
    </div>
  );
}

export default EveryDollarCard;
