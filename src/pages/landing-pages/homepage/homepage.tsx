import Header from "../../../layouts/header/header";
import Companies from "../../../layouts/companies/companies";
import Features from "../../../layouts/features/features";
import EveryDollar from "../../../layouts/every-dollar/every-dollar";
import FAQ from "../../../layouts/faq/faq";
import Footer from "../../../layouts/footer/footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Homepage() {
  const location = useLocation();

  useEffect(
    function () {
      const page = location.pathname.replace("/", "");
      if (!page) return;
      document.getElementById(page)?.scrollIntoView({ behavior: "smooth" });
    },
    [location]
  );

  return (
    <>
      <Header />
      <Companies />
      <Features />
      <EveryDollar />
      <FAQ />
      <Footer />
    </>
  );
}

export default Homepage;
