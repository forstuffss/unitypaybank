import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthNav from "../../../layouts/auth-nav/auth-nav";
import styles from "./auth.module.scss";

function Auth() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) navigate("/app");
    else setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <div className={styles.auth}>
      <AuthNav />
      <Outlet />
    </div>
  );
}

export default Auth;
