import styles from "./last-30-days.module.scss";

export type Last30DaysType = {
  transactions: string;
  earnings: string;
};

function Last30Days({ transactions, earnings }: Last30DaysType) {
  earnings = `$${(+earnings).toFixed(2)}`;

  return (
    <div className={styles["days"]}>
      <p className={`title--1 ${styles["days__title"]}`}>
        All
        <br />
        Transactions
      </p>

      <div className={styles["days__divider"]}></div>

      <div className={styles["days__info"]}>
        <p className={`title-main__subtext--1 ${styles["days__subtitle"]}`}>
          Transactions
        </p>
        <p className={`title--1 ${styles["days__info-text"]}`}>
          {transactions}
        </p>
      </div>

      <div className={styles["days__divider"]}></div>

      <div className={styles["days__info"]}>
        <p className={`title-main__subtext--1 ${styles["days__subtitle"]}`}>
          Earnings
        </p>
        <p className={`title--1 ${styles["days__info-text"]}`}>{earnings}</p>
      </div>
    </div>
  );
}

export default Last30Days;
