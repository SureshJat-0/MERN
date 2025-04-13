import { useEffect, useState } from "react";

export default function MemoryBtn({
  num,
  isStart,
  setIsStart,
  currInd,
  setCurrInd,
  stop,
  setStop,
  resetTrigger,
  setWin,
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
    checkForWin(parseInt(e.target.value), currInd);
  };

  const checkForWin = (val, ind) => {
    if (val === ind) {
      if (ind === 9) setWin(true);
      setIsBtnCurrent(true);
      setCurrInd((preVal) => preVal + 1);
    } else {
      setIsStart(false);
      setStop(false);
      return;
    }
  };

  const getButtonStyle = () => {
    if (isBtnCurrect) return "!bg-green-400";
    if (!stop) return "bg-red-400";
    return "bg-gray-50";
  };

  return (
    <div className={`rounded-lg shadow-lg ${getButtonStyle()}`}>
      <button
        disabled={!isStart || showBtn}
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
