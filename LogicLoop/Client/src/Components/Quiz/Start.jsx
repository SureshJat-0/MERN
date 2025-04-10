export default function Start({ handleStart }) {
  return (
    <div className="m-4 rounded-lg py-4 px-8 bg-white/30 border-white/30 shadow-xl backdrop-blur-md">
      <ul className="list-disc p-4 text-lg">
        <li>This is online quiz to test your knowledge.</li>
        <li>
          Multiple answer choices are give for each quesion in the test. You
          have to choose the best option.
        </li>
        <li>After completing the test, you can see your</li>
        <li>There are 10 questions in the test.</li>
        <li>There is no negative marking for wrong answers.</li>
        <li>After completing the test, you can see your result.</li>
      </ul>
      <button
        onClick={handleStart}
        className="rounded bg-purple-500 text-white px-6 py-2 ms-4 shadow-md"
      >
        Start
      </button>
    </div>
  );
}
