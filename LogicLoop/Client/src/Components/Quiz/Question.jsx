import { useEffect, useState } from "react";

export default function Question({
  question,
  handleQuestionsChange,
  length,
  currInd,
  correctAns,
  setCorrectAns,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnchange = (e) => {
    if (e.target.value === question.ans) setCorrectAns(correctAns + 1);
    setSelectedOption(e.target.value);
  };

  const getOptionStyle = (option) => {
    if (!selectedOption) return ""; // No selection yet
    if (option === question.ans) return "!bg-green-200 border-green-500";
    if (option === selectedOption) return "!bg-red-200 border-red-500";
    return "!bg-gray-100 border-gray-300 opacity-60";
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedOption(null);
    handleQuestionsChange();
  };

  return (
    <div className="m-4 border rounded-lg p-4 min-w-[50vw] bg-white/20 border-white/30 backdrop-blur-md shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">{question.question}</h1>
      <form>
        {question.options.map((option, ind) => {
          return (
            <div key={ind}>
              <label
                htmlFor={`radio-btn-${ind}`}
                className={`flex items-center cursor-pointer w-full border rounded py-2 px-4 shadow-sm bg-white/50 ${getOptionStyle(
                  option
                )}`}
              >
                <input
                  id={`radio-btn-${ind}`}
                  type="radio"
                  value={option}
                  onChange={handleOnchange}
                  disabled={!!selectedOption}
                  name={`question-${currInd}`}
                  className="appearance-none"
                />
                {option}
              </label>
              <br />
            </div>
          );
        })}
        <div className="btns">
          <button
            className="px-4 py-2 rounded-lg bg-purple-500 text-white mx-4 shadow-md"
            onClick={handleChange}
          >
            {currInd === length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
