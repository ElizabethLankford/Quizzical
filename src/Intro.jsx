import React from "react";

export default function Intro(props) {
  const { handleClick, gameStart } = props;

  const styles = {
    display: gameStart ? "flex" : "none",
  };

  return (
    <div style={styles} className="intro-container">
      <h1 className="title">Quizzical</h1>
      <p className="subtitle">
        A trivia game that asks five random questions from various categories to
        test your trivial knowledge. Press start quiz to begin.
      </p>
      <button className="start-btn" onClick={handleClick}>
        Start quiz
      </button>
    </div>
  );
}
