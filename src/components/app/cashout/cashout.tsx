import InputBox from "../../input-box/input-box";
import styles from "./cashout.module.scss";
import copyIcon from "../../../assets/copy.svg";
import bitcoinIcon from "../../../assets/bitcoin.svg";

function copyIconClickHandler() {
  // TODO:
  navigator.clipboard.writeText("dddd");
}

function Cashout() {
  return (
    <div className={styles["cashout"]}>
      <div className={styles["cashout__deposit"]}>
        <p className="title--1">Deposit</p>

        <form>
          <label htmlFor="btc_addr" className="title-main__subtext--1">
            Transfer to your custom BTC address at:
          </label>

          <InputBox
            value="1928876256387181219-09301099838937732"
            icon={copyIcon}
            readonly={true}
            placeholder=""
            type="text"
            id="btc_addr"
            onClickIcon={copyIconClickHandler}
          />
        </form>
      </div>

      <div className={styles["cashout__divider"]}></div>

      <div className={styles["cashout__withdraw"]}>
        <p className="title--1">Withdraw</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="btc-addr" className="title-main__subtext--1">
            Enter your detail:
          </label>
          <InputBox
            icon={bitcoinIcon}
            id="btc-addr"
            placeholder="Enter you BTC address"
            type="text"
          />
          <input
            type="submit"
            value="Transfer to wallet"
            className={`button button-sec ${styles["cashout__button"]}`}
          />
        </form>

        <p>
          You'll get more withdrawal method after a minimum balance of $1k.
          Paypal, Direct Bank Transfer ... Crypto wallet.
        </p>
      </div>
    </div>
  );
}

export default Cashout;
