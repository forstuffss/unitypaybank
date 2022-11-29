import { useState } from "react";
import QuestionCard from "../../components/question-card/question-card";
import styles from "./faq.module.scss";

const faqs = [
  {
    question: "What is ORBITPAY?",
    answer:
      "Managing utility payments can be overwhelming. ORBITPAY is here to help you manage and orginize your utility payment all in one App.",
  },
  {
    question: "How does ORBITPAY bonus program works?",
    answer:
      "For verified/regular users, you get 15% on first deposit. 5% on recurring deposit. 5% cashback on every first payment of the month. 2% weekly bonus for acccount with balance of $1k+.\nFor new users, you get +5% on every deposit and +5% bonus on every utility paid.",
  },
  {
    question: "Is there a referral reward point program?",
    answer:
      "Currently, there is no referral reward point program, the program is under development and we will let every user know as soon as it's in production.",
  },
  {
    question: "Is there a special registration program for businesses?",
    answer:
      "The registration process for business is same as for individual. From the Homepage, click on signup then create an account by inputing your email address and password, then sign up. You can then login and visit your Dashboard.",
  },
  {
    question: "How do I contact support?",
    answer: `There is a "Contact US" section on the footer of every pages, from there, you can get information needed to contact support. We always reply to customers as fast as we can`,
  },
];

function FAQ() {
  const [shows, setShows] = useState(new Array(faqs.length).fill(false));

  function cardOnClickHandler(cardIndex: number) {
    setShows((prevShows) =>
      prevShows.map((prevShow, i) => i === cardIndex && !prevShow)
    );
  }

  return (
    <section id="faq" className={styles["faq"]}>
      <p className="title-main__subtext title-main__subtext--1">FAQ</p>
      <h2 className="title-main title-main--1">Frequently asked questions</h2>
      <div className={styles["faq__cards"]}>
        {faqs.map(({ question, answer }, i) => (
          <QuestionCard
            id={i}
            question={question}
            answer={answer}
            cardOnClick={cardOnClickHandler}
            isActive={shows[i]}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
