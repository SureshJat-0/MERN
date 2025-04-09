import { useState } from "react";

export default function Question({ question, handleQuestionsChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnchange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getOptionStyle = (option) => {
    if (!selectedOption) return ""; // No selection yet
    if (option === question.ans) return "bg-green-200 border-green-500";
    if (option === selectedOption) return "bg-red-200 border-red-500";
    return "bg-gray-100 border-gray-300 opacity-60";
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedOption(null);
    handleQuestionsChange();
  };

  return (
    <div className="m-4 border rounded-lg p-4 min-w-[50vw]">
      <h1 className="text-2xl font-semibold mb-4">{question.question}</h1>
      <form>
        {question.options.map((option, ind) => {
          return (
            <div key={ind}>
              <label
                htmlFor={`radio-btn-${ind}`}
                className={`flex items-center cursor-pointer w-full border rounded py-2 px-4 ${getOptionStyle(
                  option
                )}`}
              >
                <input
                  id={`radio-btn-${ind}`}
                  type="radio"
                  value={option}
                  onChange={handleOnchange}
                  disabled={!!selectedOption}
                  name="option"
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
            className="px-4 py-2 border rounded-lg bg-purple-500 text-white mx-4"
            onClick={handleChange}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
