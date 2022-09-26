import styles from "./every-dollar-info.module.scss";

function EveryDollarInfo() {
  return (
    <div className={styles["dollar-info"]}>
      <p className="title-main__subtext title-main__subtext--1">
        Detail Managing your Payment
      </p>
      <h2 className="title-main title-main--1">
        Know where every Dollar is going
      </h2>
      <p className="title-main__subtext title-main__subtext--2">
        Managing utility payment effectively is at the core of individual and
        business survival. Easily understand your cash flow and expenses to see
        how your money is being invested.
      </p>
    </div>
  );
}

export default EveryDollarInfo;
