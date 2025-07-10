export default function MessagesMap(props) {
  const { msg, index } = props.value;
  return (
    <>
      <li key={index}>
        <span>{msg.sender}</span> : <span>{msg.content}</span>
      </li>
    </>
  );
}
