export default function GroupsChatPanel({ groups, handleSelectGroupForChat }) {
  return (
    <div className="m-4 my-10">
      <h1 className="text-start my-2 mx-6 text-lg font-bold">Public Channels</h1>
      <ul>
        {groups.map((group, index) => (
          <li
            key={index}
            onClick={handleSelectGroupForChat}
            data-name={group}
            className="py-4 cursor-pointer mx-2 border-b border-gray-300"
          >
            <span className="flex items-center">
              <div className="h-10 w-10 bg-gray-500 rounded-full mx-2">
                <img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png" alt="avatar" />
              </div>
              <span>{group}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
