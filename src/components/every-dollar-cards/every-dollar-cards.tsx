import EveryDollarCard from "../every-dollar-card/every-dollar-card";
import styles from "./every-dollar-cards.module.scss";

const utilities = [
  { amount: "$200", detail: "Electricity Bill", time: "07:35AM" },
  { amount: "$150", detail: "Gas Cylinder Online Bill", time: "12:00PM" },
  { amount: "$500", detail: "Water and Sewage Bill", time: "04:12PM" },
];

function EveryDollarCards() {
  return (
    <div className={styles["dollar-cards"]}>
      {utilities.map(({ amount, detail, time }, i) => (
        <EveryDollarCard
          amount={amount}
          detail={detail}
          time={time}
          key={detail}
          active={i === 1}
          extraClasses={`${styles[`dollar-cards--${i + 1}`]}`}
        />
      ))}
    </div>
  );
}

export default EveryDollarCards;
