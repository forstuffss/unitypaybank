import styles from "./hamburger.module.scss";

type IProps = {
  isHamburgerOpened: boolean;
  hamburgerOnClick: () => void;
};

function Hamburger({ isHamburgerOpened, hamburgerOnClick }: IProps) {
  return (
    <div
      className={`${styles["hamburger__parent"]}`}
      onClick={() => hamburgerOnClick()}
    >
      <div
        className={`${styles["hamburger"]} ${
          styles[`hamburger-${isHamburgerOpened ? "open" : "close"}`]
        }`}
      ></div>
    </div>
  );
}

export default Hamburger;
