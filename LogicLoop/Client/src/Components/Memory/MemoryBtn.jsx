import { useEffect, useState } from "react";

export default function MemoryBtn({
  num,
  isStart,
  setIsStart,
  currInd,
  setCurrInd,
  win,
  setWin,
  resetTrigger,
}) {
  let [showBtn, setShowBtn] = useState(false);
  let [isBtnCurrect, setIsBtnCurrent] = useState(false);

  useEffect(() => {
    setShowBtn(false);
    setIsBtnCurrent(false);
  }, [resetTrigger]);

  const onBtnClick = (e) => {
    e.preventDefault();
    if (!isStart) return;
    setShowBtn(true);
    checkForWin(e.target.value, currInd);
  };

  const checkForWin = (val, ind) => {
    if (val == ind) {
      setIsBtnCurrent(true);
      setCurrInd((preVal) => preVal + 1);
    } else {
      setIsStart(false);
      setWin(false);
      return;
    }
  };

  const getButtonStyle = () => {
      if (isBtnCurrect) return "!bg-green-400";
    if (!win) return "bg-red-400";
    return "bg-gray-50";
  };

  return (
    <div className={`rounded-lg shadow-lg ${getButtonStyle()}`}>
      <button
        disabled={!isStart}
        value={num}
        className="h-full w-full"
        onClick={onBtnClick}
      >
        <span className="text-2xl">
          {isStart ? (showBtn ? num : null) : num}
        </span>
      </button>
    </div>
  );
}
