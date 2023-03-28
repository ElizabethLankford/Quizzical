import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const { question, answers, id, checked, gameStart, handleSelection } = props;

  const allAnswers = answers.map((answer, index) => {
    const buttonStyles = {
      backgroundColor:
        checked && answer.isCorrect
          ? "#94D7A2"
          : checked && answer.isSelected && !answer.isCorrect
          ? "#F8BCBC"
          : answer.isSelected
          ? "#D6DBF5"
          : "white",

      border:
        checked && answer.isCorrect
          ? "#94D7A2"
          : checked && answer.isSelected && !answer.isCorrect
          ? "#F8BCBC"
          : answer.isSelected
          ? "#D6DBF5"
          : "white",
      opacity: checked && !answer.isSelected && !answer.isCorrect ? ".5" : "1",
    };
    return (
      <button
        key={index}
        className="answer-opt"
        onClick={() => handleSelection(id, answer.answerId)}
        style={buttonStyles}
      >
        {answer.option}
      </button>
    );
  });

  const styles = {
    display: gameStart ? "none" : "flex",
  };

  return (
    <div className="question-container" style={styles}>
      <p className="question">{question}</p>
      <div className="answer-container">{allAnswers}</div>
    </div>
  );
}
