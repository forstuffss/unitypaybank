import { Link } from "react-router-dom";
import styles from "./feature-card.module.scss";

interface IProps {
  icon: any;
  title: string;
  detail: string;
  active?: boolean;
}

function FeatureCard({ icon, title, detail, active }: IProps) {
  return (
    <div
      className={`${styles["card"]}${
        active ? " " + styles["card--active"] : ""
      }`}
    >
      <img alt={title} src={icon} className={styles["card__icon"]} />
      <h2 className="card-title">{title}</h2>
      <p className="card-detail">{detail}</p>
      <Link to="/auth/signup" className="button button-sec">
        {" "}
        Learn more
      </Link>
    </div>
  );
}

export default FeatureCard;
