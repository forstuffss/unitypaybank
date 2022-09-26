import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./redirect.module.scss";

type IProps = {
  message?: string;
  to?: string;
  time?: number;
  children?: React.ReactNode;
};

function Redirect({ message, to, time = 0, children }: IProps) {
  const [timer, setTimer] = useState(time);
  const navigate = useNavigate();

  useEffect(() => {
    if (!timer) {
      to && navigate(to);
      return;
    }

    const intervalId = setInterval(
      () => setTimer((prevTimer) => prevTimer - 1000),
      1000
    );

    return () => clearInterval(intervalId);
  }, [timer, navigate, to]);

  return (
    <>
      {message && <h1 className={styles.message}>{message}</h1>}
      {to && (
        <p className={styles.to}>
          You'll be redirected to{to.replace("/", " ")}{" "}
          {!time ? "now" : `in ${timer / 1000}`}
        </p>
      )}
      {children}
    </>
  );
}

export default Redirect;
