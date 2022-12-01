import styles from "./display-card.module.scss";
import downloadSvg from "../../assets/download.svg";
import person from "../../assets/card_dp.jpg";

function DisplayCard() {
  return (
    <div className={styles["card"]}>
      <p className={styles["card__title"]}>UNITYPAY</p>

      <div className={styles["card__payment"]}>
        <figure>
          <img alt="payment received" src={downloadSvg} />
          <figcaption>
            <p>Payment received!</p>
            <p>$120.00</p>
          </figcaption>
        </figure>
      </div>

      <p className={styles["card__info"]}>Fund with crypto</p>

      <div className={styles["card__fig"]}>
        <figure>
          <img alt="Someone" src={person} />
          <figcaption>
            <p>DAVID LAUNCE</p>
            <p>DavidLaunce.inc</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default DisplayCard;
