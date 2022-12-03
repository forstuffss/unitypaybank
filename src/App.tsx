import { Outlet } from "react-router-dom";
import { useState } from "react";
import ReusableNav from "./components/reusable-nav/reusable-nav";
import { NAV } from "./util/config";

const addMaximumScaleToMetaViewport = () => {
  const el = document.querySelector("meta[name=viewport]") as HTMLMetaElement;

  if (el !== null) {
    let content = el.getAttribute("content") || "";
    let re = /maximum-scale=[0-9.]+/g;

    if (re.test(content)) {
      content = content.replace(re, "maximum-scale=1.0");
    } else {
      content = [content, "maximum-scale=1.0"].join(", ");
    }

    el.setAttribute("content", content);
  }
};

const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent); // && !window.MSStream;

function App() {
  if (checkIsIOS()) disableIosTextFieldZoom();

  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

  function HamburgerClickHandler() {
    setIsHamburgerOpened((prevIsHamburgerOpened) => !prevIsHamburgerOpened);
  }

  return (
    <>
      <ReusableNav
        HamburgerClickHandler={HamburgerClickHandler}
        isHamburgerOpened={isHamburgerOpened}
        NAV={NAV}
      />
      <Outlet />
    </>
  );
}

export default App;
