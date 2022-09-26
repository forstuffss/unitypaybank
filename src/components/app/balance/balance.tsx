import BalanceCard from "../balance-card/balance-card";
import styles from "./balance.module.scss";

export type BalanceType = {
  name: string;
  balanceCard: {
    icon: string;
    title: string;
    balance: string;
    extraClases?: string;
  }[];
};

function Balance({ name, balanceCard }: BalanceType) {
  return (
    <div className={styles["balance"]}>
      <div className={`title--1 ${styles["balance__info"]}`}>
        <p>My Balance</p>
        <p className={styles["balance__fullname"]}>{name}</p>
      </div>

      <div className={styles["balance__balance"]}>
        {balanceCard.map(({ icon, title, balance, extraClases }) => (
          <BalanceCard
            icon={icon}
            title={title}
            balance={balance}
            extraClases={extraClases}
            key={title}
          />
        ))}
      </div>
    </div>
  );
}

export default Balance;
