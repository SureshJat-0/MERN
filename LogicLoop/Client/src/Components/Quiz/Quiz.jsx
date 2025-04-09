import { useState } from "react";
import Question from "./Question";
import Start from "./Start";
import Result from "./Result";

let Questions = [
  {
    question: "1.Fastest animal in the world?",
    options: ["Tiger", "Lion", "Leopard", "Elephant"],
    ans: "Leopard",
  },
  {
    question: "2.Fastest animal in the world?",
    options: ["Tiger", "Lion", "Leopard", "Elephant"],
    ans: "Lion",
  },
  {
    question: "3.Fastest animal in the world?",
    options: ["Tiger", "Lion", "Leopard", "Elephant"],
    ans: "Elephant",
  },
];

export default function Quiz() {
  let [isStart, setIsStart] = useState(false);
  let [showRes, setShowRes] = useState(false);
  let [currInd, setCurrInd] = useState(0);

  const handleStart = () => {
    setIsStart(true);
  };

  const handleQuestionsChange = () => {
    if (currInd < Questions.length - 1) {
      setCurrInd((preVal) => preVal + 1);
    } else {
      setShowRes(true);
    }
  };

  if (!isStart) {
    // Start Screen
    return (
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-center m-4">Quiz Game</h1>
        <Start handleStart={handleStart} />
      </div>
    );
  }
  // Result screen
  if (showRes) {
    return (
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-center m-4">Quiz Game</h1>
        <Result />
      </div>
    );
  }
  // All Quesions screen
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-center m-4">Quiz Game</h1>
      <Question
        question={Questions[currInd]}
        handleQuestionsChange={handleQuestionsChange}
      />
    </div>
  );
}
