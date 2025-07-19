import { useUser } from "../../context/User";

export default function UsersChatPanel({ users, handleSelectUserForChat }) {
  const { currentUser } = useUser();
  return (
    <div className="my-6">
      <h1 className="text-center m-2 text-xl">All Users</h1>
      <ul>
        {users?.map((user) => (
          <li
            onClick={() => handleSelectUserForChat(user)}
            key={user._id}
            className="py-2 px-4 cursor-pointer border m-2"
          >
            <span>
              {user.username}
              {user.username === currentUser.username ? " ( You ) " : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
