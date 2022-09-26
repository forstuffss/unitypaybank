import HeroCard from "../../components/hero-card/hero-card";
import HeroInfo from "../../components/hero-info/hero-info";

import styles from "./header.module.scss";

function Header() {
  return (
    <header id="home" className={styles["header"]}>
      <HeroInfo />
      <HeroCard />
    </header>
  );
}

export default Header;
