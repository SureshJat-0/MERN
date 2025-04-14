import { useState } from "react";
import Question from "./Question";
import Start from "./Start";
import Result from "./Result";
import axios from "axios";

// Getting Questions
let Questions = [];
try {
  const res = await axios.get("/api/quiz/questions");
  Questions = res.data;
} catch (err) {
  console.log("Error: ", err);
}

export default function Quiz() {
  let [isStart, setIsStart] = useState(false);
  let [showRes, setShowRes] = useState(false);
  let [currInd, setCurrInd] = useState(0);
  let [correctAns, setCorrectAns] = useState(0);

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
        <Result correctAns={correctAns} length={Questions.length} />
      </div>
    );
  }
  // All Quesions screen
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-center m-4">Quiz Game</h1>
      <Question
        question={Questions[currInd]}
        length={Questions.length}
        currInd={currInd}
        handleQuestionsChange={handleQuestionsChange}
        key={currInd}
        correctAns={correctAns}
        setCorrectAns={setCorrectAns}
      />
    </div>
  );
}
