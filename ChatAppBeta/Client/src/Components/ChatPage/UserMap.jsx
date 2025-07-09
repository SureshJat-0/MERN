export default function UserMap(props) {
    const {user, index, handleSelectUserForChat} = props.value;
  return (
    <li
      onClick={() => {
        handleSelectUserForChat(user);
      }}
      key={index}
      className="py-2 px-4 cursor-pointer border m-2"
    >
      <span>{user.username}</span>
    </li>
  );
}
