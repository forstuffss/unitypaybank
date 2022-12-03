import InputBox from "../../components/input-box/input-box";
import Form from "../../layouts/form/form";
import iconEmail from "../../assets/email.svg";
import iconMoney from "../../assets/balance.svg";
import iconPending from "../../assets/pending-balance.svg";

import React, { useState, ReactNode, useRef, useEffect } from "react";

import styles from "./owner.module.scss";
import useRequest from "../../hooks/request";
import { BASE_URL } from "../../util/config";
import AlertDialog from "../../layouts/alert-dialog/alert-dialog";
import { useNavigate } from "react-router-dom";

function Owner() {
  const [dialogToShow, setDialogToShow] = useState<null | ReactNode>(null);

  const emailAddrRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const statusRef = useRef<HTMLInputElement>(null);
  const transactionRef = useRef<HTMLInputElement>(null);
  const transactEmailRef = useRef<HTMLInputElement>(null);
  const blockEmailRef = useRef<HTMLInputElement>(null);
  const blockStatusRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [request, reset, isLoading, isError, errMsg, result] = useRequest();

  useEffect(
    function () {
      if (isLoading) return;

      if (isError) {
        setDialogToShow(
          <AlertDialog
            buttonPri="OK"
            message={errMsg || "Error occurred. Please try again later."}
            onBGBlurClick={removeDiagAndResetRequest}
            onButtonPriClick={removeDiagAndResetRequest}
          />
        );
        return;
      }

      if (result.message) {
        setDialogToShow(
          <AlertDialog
            buttonPri="OK"
            message={result.message}
            onBGBlurClick={removeDiagAndResetRequest}
            onButtonPriClick={removeDiagAndResetRequest}
          />
        );
        return;
      }

      removeDiagAndResetRequest();
    },
    [isLoading, isError, errMsg, result.message]
  );

  function removeDiagAndResetRequest() {
    setDialogToShow(null);
    reset();
  }

  function updateUserBlockStatus(e: React.FormEvent) {
    e.preventDefault();

    let status = blockStatusRef.current?.value;
    const emailAddress = blockEmailRef.current?.value;

    if (!status || !emailAddress || !["1", "2"].includes(status)) return;

    switch (status) {
      case "1":
        status = "Block";
        break;
      case "2":
        status = "Unblock";
        break;
      default:
        return;
    }

    request(`${BASE_URL}/user/update-block-status`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: { emailAddress, status },
    });
  }

  function updateBalance(e: React.FormEvent) {
    e.preventDefault();

    const emailAddress = emailAddrRef.current?.value;
    const amount = amountRef.current?.value;

    if (!emailAddress || !amount) return;

    request(`${BASE_URL}/user/update-balance`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: { emailAddress, amount },
    });
  }

  function updateTransactionStatus(e: React.FormEvent) {
    e.preventDefault();

    let status = statusRef.current?.value;
    const transactionID = transactionRef.current?.value;
    const emailAddress = transactEmailRef.current?.value;

    if (
      !status ||
      !transactionID ||
      !emailAddress ||
      !["1", "2"].includes(status)
    )
      return;

    switch (status) {
      case "1":
        status = "Pending";
        break;
      case "2":
        status = "Success";
        break;
      default:
        return;
    }

    request(`${BASE_URL}/user/update-transaction-status`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: { emailAddress, transactionID, status },
    });
  }

  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {dialogToShow && dialogToShow}

      <div className={styles.owner}>
        <button className="button button-sec" onClick={logoutHandler}>
          Logout
        </button>

        <Form
          formSubmitHandler={updateBalance}
          isLoading={isLoading}
          buttonText="Update Balance"
        >
          <p>Change Balance</p>

          <InputBox
            icon={iconEmail}
            ref={emailAddrRef}
            placeholder="Email address"
            type="email"
            required
          />

          <InputBox
            ref={amountRef}
            icon={iconMoney}
            placeholder="Amount"
            type="number"
            required
          />
        </Form>

        <Form
          formSubmitHandler={updateTransactionStatus}
          isLoading={isLoading}
          buttonText="Update Transaction"
        >
          <p>Change Transaction status</p>
          <InputBox
            icon={iconEmail}
            ref={transactEmailRef}
            placeholder="Email address"
            type="email"
            required
          />

          <InputBox
            ref={transactionRef}
            icon={iconPending}
            placeholder="Transaction ID"
            type="text"
            required
          />
          <InputBox
            ref={statusRef}
            icon={iconPending}
            placeholder="1 for Pending and 2 for Success"
            type="number"
            required
          />
        </Form>

        <Form
          formSubmitHandler={updateUserBlockStatus}
          isLoading={isLoading}
          buttonText="(Un)Block status"
        >
          <p>Change Block Status</p>
          <InputBox
            icon={iconEmail}
            ref={blockEmailRef}
            placeholder="Email address"
            type="email"
            required
          />

          <InputBox
            ref={blockStatusRef}
            icon={iconPending}
            placeholder="1 to Block and 2 to Unblock"
            type="number"
            required
          />
        </Form>
      </div>
    </>
  );
}

export default Owner;
