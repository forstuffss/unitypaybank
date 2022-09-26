import fintech from "../../assets/fintech.svg";
import bonus from "../../assets/bonus.svg";
import global from "../../assets/global.svg";
import FeatureCard from "../../components/feature-card/feature-card";
import styles from "./feature.module.scss";

const features = [
  {
    icon: fintech,
    title: "Embeded Fintech Experience",
    detail:
      "All in one payment platform and embeded fintech experience powered by blockchain.",
  },
  {
    icon: bonus,
    title: "Bonus like never before",
    detail:
      "You get 15% on first deposit. 5% on recurring deposit. 5% cashback on every first payment of the month. 2% weekly bonus for acccount with balance of $1k+.",
  },
  {
    icon: global,
    title: "Built for global payments",
    detail:
      "Process payments everywhere, anywhere and unlock value in every transaction made.",
  },
];

function Features() {
  return (
    <section id="features" className={styles.feature}>
      {features.map(({ icon, title, detail }, i) => (
        <FeatureCard
          icon={icon}
          title={title}
          detail={detail}
          active={i === 1}
          key={title}
        />
      ))}
    </section>
  );
}

export default Features;
