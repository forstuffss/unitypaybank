import styles from "./transaction-card.module.scss";

type IProps = {
  itemStyle: string;
  dividerClass: string;
  transactions?: {
    typeName: string;
    type: string;
    transferDate: string;
    transferTime: string;
    transactionID: string;
    amount: string;
    status: string;
    deliveredOn: string;
  };
};

function TransactionCard({ itemStyle, dividerClass, transactions }: IProps) {
  const {
    typeName,
    type,
    transferDate,
    transferTime,
    transactionID,
    status,
    deliveredOn,
  } = transactions!;
  let { amount } = transactions!;

  amount = `$${(+amount).toFixed(2)}`;

  return (
    <>
      <div className={dividerClass}></div>
      <div className={styles["card"]}>
        <div className={`${itemStyle} ${styles["card__multi-text"]}`}>
          <p>{typeName}</p>
          <p className={styles["card__subtext"]}>{type}</p>
        </div>

        <div className={`${itemStyle} ${styles["card__multi-text"]}`}>
          <p>{transferDate}</p>
          <p className={styles["card__subtext"]}>{transferTime}</p>
        </div>

        <p className={itemStyle}>{transactionID}</p>

        <p className={itemStyle}>{amount}</p>

        <p className={itemStyle}>{status}</p>

        <p className={itemStyle}>{deliveredOn}</p>
      </div>
    </>
  );
}

export default TransactionCard;
