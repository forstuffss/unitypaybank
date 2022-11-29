import { useState, useRef, useEffect } from "react";
import InputBox from "../../../components/input-box/input-box";
import styles from "./setting.module.scss";
import iconPass from "../../../assets/password.svg";
import iconEmail from "../../../assets/email.svg";
import Form from "../../form/form";
import useRequest from "../../../hooks/request";
import { BASE_URL } from "../../../util/config";
import AlertDialog from "../../alert-dialog/alert-dialog";

type IProps = { removeDiag: () => void };

function Setting({ removeDiag }: IProps) {
  const [showNewPassDiag, setShowNewPassDiag] = useState<boolean>(false);
  const [showNewEmailDiag, setShowNewEmailDiag] = useState<boolean>(false);
  const [alertDiagMessage, setAlertDiagMessage] = useState<string | null>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newEmailRef = useRef<HTMLInputElement>(null);
  const [request, _, isLoading, isError, errMessage, result] = useRequest();

  useEffect(
    function () {
      if (isLoading) return;

      if (isError) {
        setAlertDiagMessage(
          errMessage || "Error occurred. Please try again later."
        );
        return;
      }

      if (result.message) {
        setAlertDiagMessage(result.message);
        return;
      }
    },
    [isLoading, isError, errMessage, result]
  );

  function changePasswordFormSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    const newPassword = newPasswordRef.current?.value;

    if (!newPassword || newPassword.length < 8) return;

    request(`${BASE_URL}/user/change-password`, {
      method: "POST",
      body: { newPassword },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  function changeEmailFormSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    const newEmailAddress = newEmailRef.current?.value;

    if (!newEmailAddress) return;

    request(`${BASE_URL}/user/change-email`, {
      method: "POST",
      body: { newEmailAddress },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  return (
    <>
      {alertDiagMessage && (
        <AlertDialog message={alertDiagMessage} onBGBlurClick={removeDiag} />
      )}

      {showNewPassDiag && !alertDiagMessage && (
        <Form
          isLoading={isLoading}
          formSubmitHandler={changePasswordFormSubmitHandler}
        >
          <InputBox
            placeholder="New password"
            type="password"
            ref={newPasswordRef}
            icon={iconPass}
            required
          />
        </Form>
      )}

      {showNewEmailDiag && !alertDiagMessage && (
        <Form
          isLoading={isLoading}
          formSubmitHandler={changeEmailFormSubmitHandler}
        >
          <InputBox
            placeholder="New Email Address"
            type="email"
            ref={newEmailRef}
            icon={iconEmail}
            required
          />
        </Form>
      )}

      {!showNewPassDiag && !showNewEmailDiag && !alertDiagMessage && (
        <div className={styles.setting}>
          <p
            onClick={() => {
              setShowNewPassDiag(false);
              setShowNewEmailDiag(true);
            }}
            className={styles["setting__item"]}
          >
            Change Email Address
          </p>
          <div className={styles["setting__divider"]}></div>
          <p
            onClick={() => {
              setShowNewEmailDiag(false);
              setShowNewPassDiag(true);
            }}
            className={styles["setting__item"]}
          >
            Change password
          </p>
        </div>
      )}
    </>
  );
}

export default Setting;
