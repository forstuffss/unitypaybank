import styles from "./companies.module.scss";
import bigelow from "../../assets/bigelow.svg";
import fedex from "../../assets/fedex.svg";
import goldair from "../../assets/goldair.svg";
import oreilly from "../../assets/oreilly.svg";

const companies = [
  { name: "Bigelow", imgScr: bigelow },
  { name: "FedEx.", imgScr: fedex },
  { name: "Goldair", imgScr: goldair },
  { name: "OREILLY", imgScr: oreilly },
];

function Companies() {
  return (
    <section>
      <h2 className="title">Our partners &amp; Investors</h2>
      <div className={styles.partners}>
        {companies.map(({ name, imgScr }) => (
          <img className={styles.partner} alt={name} src={imgScr} key={name} />
        ))}
      </div>
    </section>
  );
}

export default Companies;
