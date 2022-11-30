import { BalanceType } from "../../components/app/balance/balance";
import AppNav from "../../layouts/app/app-nav/app-nav";
import BalanceAndBankInfo from "../../layouts/app/balance-and-bank-info/balance-and-bank-info";
import Transactions, {
  TransactionsType,
  TransactionType,
} from "../../layouts/app/tansactions/transactions";
import pendingBalanceIcon from "../../assets/pending-balance.svg";
import balanceIcon from "../../assets/balance.svg";
import styles from "./app.module.scss";
import { Last30DaysType } from "../../components/app/last-30-days/last-30-days";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/request";
import { BASE_URL, OWNER_EMAIL } from "../../util/config";
import PayUtility from "../../layouts/app/pay-utility/pay-utility";
import BgBlur from "../../layouts/bg-blur/bg-blur";
import Modal from "../../layouts/modal/modal";
import AlertDialog from "../../layouts/alert-dialog/alert-dialog";
import Setting from "../../layouts/app/setting/setting";

class BalanceInfo {
  constructor(
    name?: string,
    balance?: string,
    pendingBal?: string,
    transactionNum?: string,
    earnings?: string
  ) {
    const userInfo: BalanceType & Last30DaysType = {
      name: name || "",
      balanceCard: [
        {
          icon: balanceIcon,
          title: "Available Balance",
          balance: `$${Number(balance) || 0.0}`,
        },
        {
          icon: pendingBalanceIcon,
          title: "Pending",
          balance: `$${Number(pendingBal) || 0.0}`,
          extraClases: styles["balance__pending"],
        },
      ],
      transactions: (transactionNum || 0).toString(),
      earnings: (earnings || 0).toString(),
    };

    return userInfo;
  }
}

function AppDashboard() {
  const param = useParams();
  // Based on the url param(:path)
  const [dialogToRender, setDialogToRender] = useState<ReactNode | null>(null);

  const [balanceInfo, setBalanceInfo] = useState<BalanceType & Last30DaysType>(
    new BalanceInfo() as BalanceType & Last30DaysType
  );
  const [transactions, setTransactions] = useState<TransactionsType>({
    transactions: [],
  });

  // const [sessionId, setSessionId] = useState<null | string>();
  const navigate = useNavigate();
  const [request, _, isLoading, isError, errorMsg, result] = useRequest();

  useEffect(function () {
    request(`${BASE_URL}/user/userinfo`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    const acctBalance = +balanceInfo.balanceCard[0].balance.slice(1);

    if (param.path === "logout") {
      signoutUser();
      return;
    }

    if (param.path === "withdraw") {
      if (acctBalance < 10) {
        setDialogToRender(
          <AlertDialog
            title="Not Enough Balance"
            message="You have to deposit in your account to get more withdrawal options."
            buttonPri="Ok"
            onButtonPriClick={removeDialogAndBg}
            onBGBlurClick={removeDialogAndBg}
          />
        );
        return;
      }

      setDialogToRender(
        <AlertDialog
          message="The only widrawal option currently available for you is BTC. Please use the withdrawal section on your dashboard to withdraw."
          buttonPri="Ok"
          onButtonPriClick={removeDialogAndBg}
          onBGBlurClick={removeDialogAndBg}
        />
      );

      return;
    }

    if (param.path === "settings") {
      setDialogToRender(<Setting removeDiag={removeDialogAndBg} />);
      return;
    }

    if (param.path === "pay") {
      setDialogToRender(
        <PayUtility
          // token={sessionId}
          token={localStorage.getItem("token")}
          clickHandler={removeDialogAndBg}
          onPaymentSuccess={paymentSuccessfullHandler}
          renderDialog={renderDialog}
        />
      );
      return;
    }

    if (param.path === "earnings") {
      // if balance is 1k or greater, scroll transaction page to screen

      if (acctBalance >= 1000) {
        navigate("/app/");

        const scrollTo = document.getElementById("transaction-list-sect");

        if (!scrollTo) return;
        scrollTo.scrollIntoView();
        return;
      }

      setDialogToRender(
        <AlertDialog
          title="Not Enough Balance"
          message="You need at least $1k in your account to start earning."
          buttonPri="Ok"
          onButtonPriClick={removeDialogAndBg}
          onBGBlurClick={removeDialogAndBg}
        />
      );
      return;
    }

    if (localStorage.getItem("emailAddress") === OWNER_EMAIL) {
      navigate("/owner");
      return;
    }

    navigate("/app/");
  }, [param.path]);

  useEffect(() => {
    if (isLoading) return;

    // Another device has signed in and overriden the token this device have
    if (
      (result.message &&
        (result.message as string).indexOf("Invalid token provided") > -1) ||
      (errorMsg && (errorMsg as string).indexOf("Invalid token provided") > -1)
    )
      return signoutUser();

    if (isError || errorMsg) {
      setDialogToRender(
        <AlertDialog
          title="Error occurred"
          message={`${
            errorMsg ||
            "Error occurred while fetching data, please make sure you have internet then reload page."
          } Navigate to /app/logout to sign out.`}
          buttonPri="Ok"
          onButtonPriClick={() => removeDialogAndBg(false)}
          onBGBlurClick={() => removeDialogAndBg(false)}
        />
      );
    }

    if (result.message) {
      setDialogToRender(
        <AlertDialog
          message={`${result.message} Navigate to /app/logout to sign out.`}
          buttonPri="Ok"
          onButtonPriClick={() => removeDialogAndBg(false)}
          onBGBlurClick={() => removeDialogAndBg(false)}
        />
      );
    }

    // if (Object.keys(result).length && !(result.owner as unknown as any)?.fullname) signoutUser();
  }, [isLoading, isError, errorMsg, result.message]);

  useEffect(() => {
    if (
      !result.owner ??
      !result.balance ??
      !result.pending ??
      !result.transactionNum ??
      !result.earnings
    )
      return;

    setBalanceInfo(
      new BalanceInfo(
        (result.owner as unknown as { fullname: string })?.fullname || "",
        result.balance,
        result.pending,
        (result.transactionNum || 0).toString(),
        (result.earnings || 0).toString()
      ) as BalanceType & Last30DaysType
    );

    const transact: TransactionsType = {
      transactions: result.transactions as unknown as [],
    };

    setTransactions(transact);
  }, [
    result.owner,
    result.balance,
    result.pending,
    result.transactionNum,
    result.transactions,
    result.earnings,
  ]);

  function signoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("emailAddress");
    navigate("/auth/login");
  }

  // called from pay-utility when there is a message to render from request (useRequest)
  function renderDialog(dialog: ReactNode) {
    setDialogToRender(dialog);
  }

  function removeDialogAndBg(toNavigate: boolean = true) {
    setDialogToRender(null);
    toNavigate && navigate("/app/");
  }

  function paymentSuccessfullHandler(newTransaction: TransactionType) {
    addTransactions(newTransaction);
    removeDialogAndBg();
  }

  function addTransactions(newTransaction: TransactionType) {
    setTransactions((prevTransactions) => {
      const newTransactions = [...prevTransactions.transactions];
      newTransactions.push(newTransaction);

      return { transactions: newTransactions };
    });
  }

  return (
    <>
      {isLoading && <div className="loading"></div>}
      {dialogToRender && <BgBlur onBGBlurClick={removeDialogAndBg} />}
      <Modal>{dialogToRender}</Modal>

      {balanceInfo.name && (
        <>
          <AppNav />
          <BalanceAndBankInfo
            name={balanceInfo.name}
            balanceCard={balanceInfo.balanceCard}
            transactions={balanceInfo.transactions}
            earnings={balanceInfo.earnings}
          />
          <Transactions transactions={transactions.transactions} />
        </>
      )}
    </>
  );
}

export default AppDashboard;
