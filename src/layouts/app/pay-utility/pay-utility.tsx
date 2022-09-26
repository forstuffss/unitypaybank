import utility from "../../../assets/utility.svg";
import amount from "../../../assets/balance.svg";
import bank from "../../../assets/bank.svg";
import accountDetail from "../../../assets/account-detail.svg";
import InputBox from "../../../components/input-box/input-box";
import { FormEvent, ReactNode, useEffect, useRef } from "react";
import styles from "./pay-utility.module.scss";
import useRequest from "../../../hooks/request";
import { TransactionType } from "../tansactions/transactions";
import { BASE_URL } from "../../../util/config";
import AlertDialog from "../../alert-dialog/alert-dialog";

type IProps = {
  token?: string | null;
  renderDialog: (dialog: ReactNode) => void;
  clickHandler: () => void;
  onPaymentSuccess: (newTransaction: TransactionType) => void;
};

function PayUtility({
  token,
  clickHandler,
  onPaymentSuccess,
  renderDialog,
}: IProps) {
  const utilityRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const bankRef = useRef<HTMLInputElement>(null);
  const accountNumRef = useRef<HTMLInputElement>(null);
  const accountNameRef = useRef<HTMLInputElement>(null);

  const [request, reset, isLoading, isError, errorMsg, result] = useRequest();

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      renderDialog(
        <AlertDialog
          title="Error occurred"
          message={errorMsg || "Please try again later"}
          buttonPri="Ok"
          onBGBlurClick={removeDiaglog}
          onButtonPriClick={removeDiaglog}
        />
      );
      return;
    }

    if (Number(result.code) === 1) {
      // paid successfully
      renderDialog(
        <AlertDialog
          message={result.message || "Utility successfully paid"}
          buttonPri="Ok"
          onBGBlurClick={paymentSuccefullHandler}
          onButtonPriClick={paymentSuccefullHandler}
        />
      );
      return;
    }

    if (result.message) {
      renderDialog(
        <AlertDialog
          message={result.message}
          buttonPri="Ok"
          onButtonPriClick={paymentNotSuccessfullHandler}
          onBGBlurClick={paymentNotSuccessfullHandler}
        />
      );
    }
  }, [isLoading, errorMsg, isError, result.message, result.code]);

  function removeDiaglog() {
    reset();
    clickHandler();
  }

  function paymentSuccefullHandler() {
    reset();
    onPaymentSuccess(result.transaction as unknown as TransactionType);
  }

  function paymentNotSuccessfullHandler() {
    reset();
    clickHandler();
  }

  function payUtility(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return;

    const utility = utilityRef.current?.value;
    const amount = amountRef.current?.value;
    const bank = bankRef.current?.value;
    const accountNum = accountNumRef.current?.value;
    const accountName = accountNameRef.current?.value;

    if (
      !utility ||
      !amount ||
      !Number(amount) ||
      !bank ||
      !accountNum ||
      !accountName
    )
      return;

    const transaction: TransactionType = {
      amount,
      typeName: utility,
      type: "Utility payment",
      status: "Pending",
      transferDate: Date.now().toString(),
      transferTime: "",
      transactionID: "",
      deliveredOn: "-",
    };

    request(`${BASE_URL}/transaction/add-payment`, {
      method: "POST",
      body: transaction,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <form onSubmit={payUtility} className={styles["ctn"]}>
      <InputBox
        icon={utility}
        type="text"
        ref={utilityRef}
        required={true}
        placeholder="Utility name (Electricity, Gas...)"
      />

      <InputBox
        icon={amount}
        type="text"
        ref={amountRef}
        required={true}
        placeholder="Amount in dollar (100, 200...)"
      />

      <InputBox
        icon={bank}
        type="text"
        ref={bankRef}
        required={true}
        placeholder="Bank name"
      />

      <InputBox
        icon={accountDetail}
        type="text"
        ref={accountNumRef}
        required={true}
        placeholder="Account number"
      />

      <InputBox
        icon={accountDetail}
        type="text"
        ref={accountNameRef}
        required={true}
        placeholder="Account name"
      />

      <button type="submit" className="button button-pri">
        {isLoading ? <div className="loading"></div> : "Pay Now"}
      </button>
    </form>
  );
}

export default PayUtility;
