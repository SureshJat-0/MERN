import { useEffect, useState } from "react";
import MemoryBtn from "./MemoryBtn";

export default function Memory({ n }) {
  const [start, setStart] = useState(false);
  const [currInd, setCurrInd] = useState(1);
  const [stop, setStop] = useState(true);
  const [numbers, setNumbers] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [win, setWin] = useState(false);

  // Generate arr of 1 to 9
  const generateShuffleArray = () => {
    let nums = Array.from({ length: n }, (_, i) => i + 1);
    // Fisher–Yates shuffle
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  };

  useEffect(() => {
    setNumbers(generateShuffleArray());
  }, [n]);

  const getMessage = () => {
    if (win) return "🎉 Congratulations, You Won!";
    if (start) return "";
    return stop ? "Remember the position of all numbers." : "You Lose the Game";
  };

  // Reset Game
  const resetGame = () => {
    setStop(true);
    setStart(false);
    setCurrInd(1);
    setNumbers(generateShuffleArray());
    setResetTrigger((prev) => prev + 1); // trigger child reset
    setWin(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl my-2">Memory Game</h1>
      <p className="text-xl mb-1">{`Your Score : ${currInd - 1}`}</p>
      <p className="text-xl mb-4">{getMessage()}</p>
      <div className="w-1/2 h-[50vh] grid grid-cols-3 gap-4">
        {numbers.map((num, ind) => {
          return (
            <MemoryBtn
              key={ind}
              num={num}
              isStart={start}
              setIsStart={setStart}
              currInd={currInd}
              setCurrInd={setCurrInd}
              stop={stop}
              setStop={setStop}
              resetTrigger={resetTrigger}
              setWin={setWin}
            />
          );
        })}
      </div>
      <button
        className="rounded bg-purple-500 text-white text-lg px-6 py-2 ms-4 shadow-md my-4"
        onClick={start ? resetGame : stop ? () => setStart(true) : resetGame}
      >
        {start ? "Exit" : stop ? "Start" : "Re-Start"}
      </button>
    </div>
  );
}
