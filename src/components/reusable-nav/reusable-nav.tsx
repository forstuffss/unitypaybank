import { ReactNode, useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BgBlur from "../../layouts/bg-blur/bg-blur";
import Hamburger from "../hamburger/hamburger";
import styles from "./reusable-nav.module.scss";

type IProps = {
  NAV: { nav: string; to: string }[];
  isHamburgerOpened: boolean;
  HamburgerClickHandler: () => void;
  dontShowActionButtons?: boolean;
  children?: ReactNode;
};

function ReusableNav({
  NAV,
  isHamburgerOpened,
  HamburgerClickHandler,
  dontShowActionButtons,
  children,
}: IProps) {
  useLayoutEffect(
    function () {
      document.documentElement.style.overflowY = isHamburgerOpened
        ? "hidden"
        : "unset";
    },
    [isHamburgerOpened]
  );

  return (
    <nav className={styles.navi}>
      <div
        className={`${styles["navi__bg-mobile"]}${
          isHamburgerOpened ? " " + styles["navi__bg-mobile--active"] : ""
        }`}
      ></div>

      <div>
        <p className="app-icon">UNITYPAY</p>
      </div>

      <div>
        <ul
          className={`${styles["navi__items"]}${
            isHamburgerOpened ? " " + styles["navi__items--active"] : ""
          }`}
        >
          {NAV.map(({ nav, to }) => (
            <NavLink
              to={to}
              className={({ isActive }) =>
                `navi-item${isActive ? " navi-item--active" : ""}`
              }
              key={nav}
            >
              {nav}
            </NavLink>
          ))}
        </ul>
      </div>

      <div>
        {children && children}
        {!dontShowActionButtons && (
          <>
            <Link
              to="/auth/login"
              className={`button button-sec ${styles["navi-action"]} ${styles["navi-action--login"]}`}
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className={`button button-pri ${styles["navi-action"]} ${
                styles["navi-action--signup"]
              }${
                isHamburgerOpened
                  ? " " + styles["navi-action--signup--active"]
                  : ""
              }`}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      <Hamburger
        isHamburgerOpened={isHamburgerOpened}
        hamburgerOnClick={HamburgerClickHandler}
      />
      {isHamburgerOpened && <BgBlur onBGBlurClick={HamburgerClickHandler} />}
    </nav>
  );
}

export default ReusableNav;
