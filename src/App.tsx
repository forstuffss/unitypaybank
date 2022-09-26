import { Outlet } from "react-router-dom";
import { useState } from "react";
import ReusableNav from "./components/reusable-nav/reusable-nav";
import { NAV } from "./util/config";

function App() {
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
