import InputBox from "../../../../components/input-box/input-box";
import iconEmail from "../../../../assets/email.svg";
import styles from "../auth.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import useRequest from "../../../../hooks/request";
import { BASE_URL } from "../../../../util/config";
import AlertDialog from "../../../../layouts/alert-dialog/alert-dialog";

function ForgetPassword() {
  const [message, setMessage] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);

  const [request, reset, isLoading, isError, errorMessage, result] =
    useRequest();

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      setMessage(errorMessage!);
      return;
    }

    setMessage(result.message);
  }, [isLoading, result.message, errorMessage, isError]);

  function forgetPasswordHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    reset();

    const emailAddress = emailRef.current?.value;

    if (!emailAddress) return;

    request(`${BASE_URL}/auth/forget`, {
      method: "POST",
      headers: {},
      body: { emailAddress },
    });
  }

  function alertClickHandler() {
    reset();
  }

  return (
    <>
      {message && (
        <AlertDialog
          message={message}
          title={isError ? "Error occurred" : undefined}
          onBGBlurClick={alertClickHandler}
          onButtonPriClick={alertClickHandler}
          buttonPri="Ok"
        />
      )}
      <div className={styles["auth"]}>
        <p className={styles["auth__title"]}>
          We will send instructions to help reset your password
        </p>
        <form className={styles["auth__form"]} onSubmit={forgetPasswordHandler}>
          <InputBox
            ref={emailRef}
            placeholder="Email Address"
            type="email"
            icon={iconEmail}
            required
          />
          <button
            type="submit"
            className={`button button-pri ${styles["auth__action"]}`}
          >
            {isLoading ? <div className="loading"></div> : "FORGET PASSWORD"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
