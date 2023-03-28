import { useState, useEffect } from "react";
import Question from "./Question";
import Intro from "./Intro";
import "./App.css";
import { nanoid } from "nanoid";
import he from "he";

export default function App() {
  const [resetGame, setResetGame] = useState(true);
  const [newGame, setNewGame] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuiz(
          data.results.map((each) => {
            const id = nanoid();
            const sortedAnswers = [
              ...each.incorrect_answers,
              each.correct_answer,
            ].sort();
            const correctAnswer = each.correct_answer;
            const answerObject = sortedAnswers.map((answer, index) => {
              return {
                option: he.decode(answer),
                answerId: id + index,
                isCorrect: answer === correctAnswer ? true : false,
                isSelected: false,
                score: 0,
              };
            });
            return {
              question: he.decode(each.question),
              answers: answerObject,
              id: id,
            };
          })
        );
      });
    return () => console.log("cleaned");
  }, [newGame]);

  function toggleStartBtn() {
    setResetGame((prevGameState) => !prevGameState);
    console.log("Game reset");
  }
  function handleNewGame() {
    setResetGame((preGameState) => !preGameState);
    setNewGame((prev) => !prev);
    if (check) {
      setCheck((prevCheck) => !prevCheck);
    }
    setScore(0);
  }

  function handleSelection(questionId, id) {
    setQuiz((preQuiz) => {
      return preQuiz.map((eachQuestion) => {
        if (eachQuestion.id === questionId) {
          return {
            ...eachQuestion,
            answers: eachQuestion.answers.map((eachAnswer) => {
              if (eachAnswer.answerId === id) {
                return {
                  ...eachAnswer,
                  isSelected: !eachAnswer.isSelected,
                };
              } else {
                return {
                  ...eachAnswer,
                  isSelected: false,
                };
              }
            }),
          };
        } else {
          return { ...eachQuestion };
        }
      });
    });
  }

  function handleCheck(e) {
    setCheck((prevState) => !prevState);
    quiz.map((question) => {
      return question.answers.map((answer) => {
        if (answer.isCorrect && answer.isSelected) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });
    if (score > 4) {
      setAllCorrect(true);
      console.log("all answers true");
    }
  }

  const questionElement = quiz.map((q) => {
    return (
      <Question
        key={q.id}
        id={q.id}
        question={q.question}
        answers={q.answers}
        gameStart={q.resetGame}
        isSelected={q.isSelected}
        handleSelection={handleSelection}
        checked={check}
      />
    );
  });

  return (
    <div className="container">
      {resetGame ? (
        <Intro handleClick={toggleStartBtn} gameStart={resetGame} />
      ) : (
        questionElement
      )}

      {!resetGame && !check ? (
        <div className="check-container">
          <button className="check-btn" onClick={handleCheck}>
            Check answers
          </button>
        </div>
      ) : !resetGame && check ? (
        <div className="score-container">
          <p className="score-text">You scored {score}/5 correct answers</p>
          <button className="check-btn" onClick={handleNewGame}>
            Play again
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
