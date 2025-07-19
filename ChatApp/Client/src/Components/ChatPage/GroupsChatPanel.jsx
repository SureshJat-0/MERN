export default function GroupsChatPanel({ groups, handleSelectGroupForChat }) {
  return (
    <div className="m-2 my-6">
      <h1 className="text-center m-2 text-xl">Public Channels</h1>
      <ul>
        {groups.map((group, index) => (
          <li
            key={index}
            onClick={handleSelectGroupForChat}
            data-name={group}
            className="py-2 px-4 cursor-pointer border m-2"
          >
            <span>{group}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
