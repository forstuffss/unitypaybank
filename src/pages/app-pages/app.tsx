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
import { BASE_URL } from "../../util/config";
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

  const [sessionId, setSessionId] = useState<null | string>();
  const navigate = useNavigate();
  const [request, _, isLoading, isError, errorMsg, result] = useRequest();

  useEffect(() => {
    if (param.path === "logout") {
      signoutUser();
      return;
    }

    if (param.path === "withdraw") {
      setDialogToRender(
        <AlertDialog
          title="Not Enough Balance"
          message="You have to deposit in your account to get more withdrawal option."
          buttonPri="Ok"
          onButtonPriClick={removeDialogAndBg}
          onBGBlurClick={removeDialogAndBg}
        />
      );
      return;
    }

    if (param.path === "settings") {
      setDialogToRender(<Setting />);
      return;
    }

    if (param.path === "pay") {
      setDialogToRender(
        <PayUtility
          token={sessionId}
          clickHandler={removeDialogAndBg}
          onPaymentSuccess={paymentSuccessfullHandler}
          renderDialog={renderDialog}
        />
      );
      return;
    }

    if (param.path === "earnings") {
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

    navigate("/app/");
  }, [param.path]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSessionId(token);
      return;
    }
    navigate("/auth/login");
  }, [navigate]);

  useEffect(() => {
    if (!sessionId) return;

    request(`${BASE_URL}/user/userinfo`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });
  }, [sessionId]);

  useEffect(() => {
    if (isLoading) return;

    if (isError || errorMsg)
      setDialogToRender(
        <AlertDialog
          title="Error occurred"
          message={
            errorMsg ||
            "Error occurred while fetching data, please make sure you have internet then reload page."
          }
          buttonPri="Ok"
          onButtonPriClick={() => removeDialogAndBg(false)}
          onBGBlurClick={() => removeDialogAndBg(false)}
        />
      );

    if (result.message)
      setDialogToRender(
        <AlertDialog
          message={result.message}
          buttonPri="Ok"
          onButtonPriClick={() => removeDialogAndBg(false)}
          onBGBlurClick={() => removeDialogAndBg(false)}
        />
      );
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

  return isLoading || !(result.owner as unknown as any)?.fullname ? (
    <div className="loading"></div>
  ) : (
    <>
      {dialogToRender && <BgBlur onBGBlurClick={removeDialogAndBg} />}
      <Modal>{dialogToRender}</Modal>
      <AppNav />
      <BalanceAndBankInfo
        name={balanceInfo.name}
        balanceCard={balanceInfo.balanceCard}
        transactions={balanceInfo.transactions}
        earnings={balanceInfo.earnings}
      />
      <Transactions transactions={transactions.transactions} />
    </>
  );
}

export default AppDashboard;
