import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DDArrow from "../../dd-arrow/dd-arrow";
import styles from "./profile-drop-down.module.scss";

type IProps = {
  isDDShown: boolean;
  ddItems: { nav: string; to: string }[];
  dpImg: string;
  onDDClick: () => void;
};

function ProfileDropDown({ onDDClick, ddItems, isDDShown, dpImg }: IProps) {
  const [isInDOM, setIsInDOM] = useState(false);

  useEffect(() => {
    if (!isDDShown) {
      setTimeout(() => setIsInDOM(false), 200);
      return;
    }

    setIsInDOM(true);
  }, [isDDShown]);

  return (
    <div className={styles["profile"]} onClick={onDDClick}>
      <img src={dpImg} alt="Profile" className={styles["profile__img"]} />
      <DDArrow />
      {isInDOM && (
        <div
          className={`${styles["profile__dd"]} ${
            isDDShown
              ? styles["profile__dd--active"]
              : styles["profile__dd--not-active"]
          }`}
        >
          {ddItems.map(({ nav, to }) => (
            <Link to={to} className="navi-item__active" key={nav}>
              {nav}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
