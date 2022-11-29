import TransactionCard from "../../../components/app/transaction-card/transaction-card";
import styles from "./transactions.module.scss";

// Single transaction
export type TransactionType = {
  typeName: string;
  type: string;
  transferDate: string;
  transferTime: string;
  transactionID: string;
  amount: string;
  status: string;
  deliveredOn: string;
};

// Transaction array
export type TransactionsType = {
  transactions: {
    typeName: string;
    type: string;
    transferDate: string;
    transferTime: string;
    transactionID: string;
    amount: string;
    status: string;
    deliveredOn: string;
  }[];
};

function Transactions({ transactions }: TransactionsType) {
  return (
    // The id is used to scroll this layout into view when user clicks on "Earnings" in navi
    <section id="transaction-list-sect" className={styles["section"]}>
      <div className={styles["transactions"]}>
        <p className={`title--1 ${styles["transactions__title"]}`}>
          Cash Out Transactions
        </p>

        <div className={styles["transactions_list"]}>
          <div className={styles["transactions__divider"]}></div>
          <ul className={styles["transactions__sub"]}>
            <li className={styles["transactions__item"]}>Type</li>
            <li className={styles["transactions__item"]}>Date</li>
            <li className={styles["transactions__item"]}>Transaction ID</li>
            <li className={styles["transactions__item"]}>Amount</li>
            <li className={styles["transactions__item"]}>Status</li>
            <li className={styles["transactions__item"]}>Delivered On</li>
          </ul>

          {transactions.map((_, i, arr) => (
            <TransactionCard
              itemStyle={styles["transactions__item"]}
              dividerClass={styles["transactions__divider"]}
              transactions={arr[i]}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Transactions;
