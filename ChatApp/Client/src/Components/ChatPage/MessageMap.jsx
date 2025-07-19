import { useUser } from "../../context/User";

export default function MessagesMap(props) {
  const { message, index } = props.value;
  const { currentUser } = useUser();
  return (
    <>
      <li
        key={index}
        className={`flex m-2 ${
          message.sender.username === currentUser.username
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <span className="bg-[#EDEEF7] rounded-lg px-4 py-1">
          <div className="text-sm text-pink-300">{message.sender.username}</div>
          <div className="text-zinc-900 font-semibold">{message.message}</div>
        </span>
      </li>
    </>
  );
}
