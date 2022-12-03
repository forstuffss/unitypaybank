import InputBox from "../../input-box/input-box";
import styles from "./cashout.module.scss";
import copyIcon from "../../../assets/copy.svg";
import bitcoinIcon from "../../../assets/bitcoin.svg";

import { useRef, useEffect, useState, ReactNode } from "react";
import useRequest from "../../../hooks/request";
import { BASE_URL } from "../../../util/config";
import AlertDialog from "../../../layouts/alert-dialog/alert-dialog";

function Cashout() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [dialogBox, setDialogBox] = useState<ReactNode | null>(null);
  const btcDepositAddrBoxRef = useRef<HTMLInputElement>(null);
  const [request, reset, isLoading, isError, errMsg, result] = useRequest();

  useEffect(function () {
    request(`${BASE_URL}/user/deposit-wallet`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }, []);

  useEffect(
    function () {
      if (isLoading) return;

      if (isError || errMsg) {
        setWalletAddress("Please refresh this page");
      }

      if (errMsg || result.message) {
        return setDialogBox(
          <AlertDialog
            message={errMsg || result.message}
            buttonPri="OK"
            onBGBlurClick={removeDiagAndResetReq}
            onButtonPriClick={removeDiagAndResetReq}
          />
        );
      }

      if (result.address) {
        setWalletAddress(result.address);
      }
    },
    [isLoading, isError, errMsg, result.message, result.address]
  );

  function removeDiagAndResetReq() {
    reset();
    setDialogBox(null);
  }

  function copyIconClickHandler() {
    const btcDepositAddress = btcDepositAddrBoxRef.current?.value;

    if (!btcDepositAddress) return;

    navigator.clipboard.writeText(btcDepositAddress);

    setDialogBox(
      <AlertDialog
        message="Copied"
        buttonPri="Ok"
        onBGBlurClick={removeDiagAndResetReq}
        onButtonPriClick={removeDiagAndResetReq}
      />
    );
  }

  return (
    <>
      {dialogBox && dialogBox}

      <div className={styles["cashout"]}>
        <div className={styles["cashout__deposit"]}>
          <p className="title--1">Deposit</p>

          <form>
            <label htmlFor="btc_addr" className="title-main__subtext--1">
              Transfer to your custom BTC address at:
            </label>

            <InputBox
              value={walletAddress || "Loadind address..."}
              icon={copyIcon}
              readonly={true}
              placeholder=""
              type="text"
              id="btc_addr"
              onClickIcon={copyIconClickHandler}
              ref={btcDepositAddrBoxRef}
            />
          </form>
        </div>

        <div className={styles["cashout__divider"]}></div>

        <div className={styles["cashout__withdraw"]}>
          <p className="title--1">Withdraw</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="btc-addr" className="title-main__subtext--1">
              Enter your detail:
            </label>
            <InputBox
              icon={bitcoinIcon}
              id="btc-addr"
              placeholder="Enter you BTC address"
              type="text"
            />
            <input
              type="submit"
              value="Transfer to wallet"
              className={`button button-sec ${styles["cashout__button"]}`}
            />
          </form>

          <p>
            You'll get more withdrawal method after a minimum balance of $1k and
            your account has been verified by our system. Paypal, Direct Bank
            Transfer ... Crypto wallet.
          </p>
        </div>
      </div>
    </>
  );
}

export default Cashout;
