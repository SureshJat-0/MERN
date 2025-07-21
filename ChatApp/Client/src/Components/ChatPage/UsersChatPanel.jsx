import { useUser } from "../../context/User";

export default function UsersChatPanel({ users, handleSelectUserForChat }) {
  // function to get random number from string
  // Math.random() re-randers component on every change
  function getAvatarNumber(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return (sum % 35) + 1;
  }
  const { currentUser } = useUser();
  return (
    <div className="mt-4 flex flex-col h-[60vh]">
      <h1 className="text-start my-2 mx-6 text-lg font-bold">All Users</h1>
      <ul className="overflow-y-auto h-[80%]">
        {users?.map((user) => (
          <li
            onClick={() => handleSelectUserForChat(user)}
            key={user._id}
            className="py-4 cursor-pointer mx-2 border-b border-gray-300"
          >
            <span className="flex items-center">
              <div className="h-10 w-10 rounded-full mx-2 bg-amber-200">
                <img
                  src={`https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_${getAvatarNumber(
                    user._id
                  )}.png`}
                  alt="avater"
                />
              </div>
              <span>
                {user.username}
                {user.username === currentUser.username ? " ( You ) " : ""}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
