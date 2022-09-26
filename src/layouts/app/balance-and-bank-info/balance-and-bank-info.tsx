import Balance, { BalanceType } from "../../../components/app/balance/balance";
import Cashout from "../../../components/app/cashout/cashout";
import Last30Days, {
  Last30DaysType,
} from "../../../components/app/last-30-days/last-30-days";
import styles from "./balance-and-bank-info.module.scss";

function BalanceAndBankInfo({
  name: fullname,
  balanceCard,
  transactions,
  earnings,
}: BalanceType & Last30DaysType) {
  return (
    <section className={styles["container"]}>
      <Balance name={fullname} balanceCard={balanceCard} />
      <Last30Days transactions={transactions} earnings={earnings} />
      <Cashout />
    </section>
  );
}

export default BalanceAndBankInfo;
