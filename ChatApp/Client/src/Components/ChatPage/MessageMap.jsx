export default function MessagesMap(props) {
  const { msg, index } = props.value;
  return (
    <>
      <li key={index}>
        <span>{msg.sender.username}</span> : <span>{msg.content}</span>
      </li>
    </>
  );
}
