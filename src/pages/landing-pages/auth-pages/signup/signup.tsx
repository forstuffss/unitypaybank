import InputBox from "../../../../components/input-box/input-box";
import iconUser from "../../../../assets/profile.svg";
import iconEmail from "../../../../assets/email.svg";
import iconPass from "../../../../assets/password.svg";
import styles from "../auth.module.scss";
import useRequest from "../../../../hooks/request";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../../util/config";
import AlertDialog from "../../../../layouts/alert-dialog/alert-dialog";

function Signup() {
  const [request, reset, isLoading, isError, errorMessage, result] =
    useRequest();
  const [message, setMessage] = useState<string>();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    setMessage(result.message);
  }, [isLoading, errorMessage, result.message]);

  useEffect(() => {
    if (!message) return;
    setShowAlert(true);
  }, [message]);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function signupHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return;

    const emailAddress = emailRef.current?.value;
    const fullname = fullNameRef.current?.value;
    const password = passwordRef.current?.value;

    request(BASE_URL + "/auth/signup", {
      method: "POST",
      body: {
        emailAddress,
        fullname,
        password,
      },
      headers: {},
    });
  }

  function alertClickHandler() {
    setShowAlert(false);
    reset();
  }

  return (
    <>
      {showAlert && (
        <AlertDialog
          title={isError ? "Error occurred" : undefined}
          message={message ? message : ""}
          buttonPri="OK"
          onBGBlurClick={alertClickHandler}
          onButtonPriClick={alertClickHandler}
        />
      )}
      <div className={styles["auth"]}>
        <p className={styles["auth__title"]}>Created for you convenience</p>
        <form className={styles["auth__form"]} onSubmit={signupHandler}>
          <InputBox
            ref={fullNameRef}
            placeholder="Fullname"
            type="text"
            icon={iconUser}
            required
          />
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
            {isLoading ? <div className="loading"></div> : "SIGN UP"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
