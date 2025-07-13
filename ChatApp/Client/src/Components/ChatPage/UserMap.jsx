import { useUser } from "../../context/User";

export default function UserMap({user, fun}) {
  const { currentUser } = useUser();
  return (
    <li
      onClick={() => {
        fun(user);
      }}
      key={user._id}
      className="py-2 px-4 cursor-pointer border m-2"
    >
      <span>
        {user.username}
        {user.username === currentUser.username ? " ( You )" : ""}
      </span>
    </li>
  );
}
