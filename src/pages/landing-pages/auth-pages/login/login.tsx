import InputBox from "../../../../components/input-box/input-box";
import iconEmail from "../../../../assets/email.svg";
import iconPass from "../../../../assets/password.svg";
import styles from "../auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import useRequest from "../../../../hooks/request";
import { BASE_URL } from "../../../../util/config";
import AlertDialog from "../../../../layouts/alert-dialog/alert-dialog";

function Login() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [request, reset, isLoading, isError, errorMessage, result] =
    useRequest();

  useEffect(() => {
    if (isLoading) return;

    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("emailAddress", result.emailAddress!);
      navigate("/app");
      return;
    }

    setMessage(result.message);
    setCode((result.code as unknown as number) || 0);
  }, [isLoading, errorMessage, result.message, result.code, result.token]);

  useEffect(() => {
    if (!message) return;
    setShowAlert(true);
  }, [message]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return;

    const emailAddress = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!emailAddress || !password) return;

    request(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {},
      body: { emailAddress, password },
    });
  }

  function alertClickHandler() {
    setShowAlert(false);
    reset();
  }

  function resendVerificationMail() {
    setShowAlert(false);
    reset();

    const emailAddress = emailRef.current?.value;

    if (!emailAddress) return;

    request(`${BASE_URL}/auth/send-verification-mail`, {
      method: "POST",
      headers: {},
      body: { emailAddress },
    });
  }

  return (
    <>
      {showAlert && (
        <AlertDialog
          title={isError ? "Error occurred" : undefined}
          message={message ? message : ""}
          buttonPri="OK"
          buttonSec={code === 1 ? "Resend" : undefined}
          onBGBlurClick={alertClickHandler}
          onButtonPriClick={alertClickHandler}
          onButtonSecClick={resendVerificationMail}
        />
      )}

      <div className={styles["auth"]}>
        <p className={styles["auth__title"]}>Login to manage your account</p>
        <form className={styles["auth__form"]} onSubmit={formSubmitHandler}>
          <InputBox
            ref={emailRef}
            placeholder="Email Address"
            type="email"
            icon={iconEmail}
            required
          />
          <InputBox
            ref={passwordRef}
            placeholder="Password"
            type="password"
            icon={iconPass}
            required
          />
          <button
            type="submit"
            className={`button button-pri ${styles["auth__action"]}`}
          >
            {isLoading ? <div className="loading"></div> : "SIGN IN"}
          </button>
        </form>
        <Link to="/auth/forget" className="title-main__subtext--1">
          Forget password?
        </Link>
      </div>
    </>
  );
}

export default Login;
