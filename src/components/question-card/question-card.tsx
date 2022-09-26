import styles from "./question-card.module.scss";

type IProps = {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  cardOnClick: (showIndex: number) => void;
};

function QuestionCard({ question, answer, isActive, id, cardOnClick }: IProps) {
  return (
    <div
      className={`${styles["card"]} ${
        styles[`card--${isActive ? "open" : "close"}`]
      }`}
      onClick={() => cardOnClick(id)}
    >
      <div className={styles["card__support"]}>
        <div className={styles["card__top"]}>
          <h3 className={`title title--1 ${styles["card__question"]}`}>
            {question}
          </h3>
          {isActive ? (
            <p className={styles["card__icon"]}>&and;</p>
          ) : (
            <p className={styles["card__icon"]}>&or;</p>
          )}
        </div>
        <p
          className={`title-main__subtext title-main__subtext-2 ${
            styles["card__answer"]
          } ${
            isActive
              ? styles["card__answer--open"]
              : styles["card__answer--close"]
          }`}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default QuestionCard;
