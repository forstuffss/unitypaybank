import styles from "./bg-design.module.scss";
import { createPortal } from "react-dom";

function BgDesign() {
  const el = <div className={styles["bg-design"]}></div>;

  return createPortal(el, document.getElementById("bg-design")!);
}

export default BgDesign;
