import { useState } from "react";
import ProfileDropDown from "../../../components/app/profile-drop-down/profile-drop-down";
import ReusableNav from "../../../components/reusable-nav/reusable-nav";
import { APP_NAV, DDItems } from "../../../util/config";
//TODO: this image should be from the server
import dp from "../../../assets/card_dp.jpg";

function AppNav() {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isDDShown, setIsDDShown] = useState(false);

  function HamburgerClickHandler() {
    setIsHamburgerClicked((prevIsClicked) => !prevIsClicked);
  }

  function DDClickHandler() {
    setIsDDShown((prevIsDDShown) => !prevIsDDShown);
  }

  return (
    <ReusableNav
      NAV={APP_NAV}
      isHamburgerOpened={isHamburgerClicked}
      HamburgerClickHandler={HamburgerClickHandler}
      dontShowActionButtons={true}
    >
      <ProfileDropDown
        dpImg={dp}
        ddItems={DDItems}
        isDDShown={isDDShown}
        onDDClick={DDClickHandler}
      />
    </ReusableNav>
  );
}

export default AppNav;
