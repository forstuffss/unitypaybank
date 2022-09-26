import styles from "./setting.module.scss";

function Setting() {
  return (
    <div className={styles.setting}>
      <p className={styles["setting__item"]}>Change Email Address</p>
      <div className={styles["setting__divider"]}></div>
      <p className={styles["setting__item"]}>Change password</p>
      <div className={styles["setting__divider"]}></div>
      <p className={styles["setting__item"]}>Change display picture</p>
    </div>
  );
}

export default Setting;
