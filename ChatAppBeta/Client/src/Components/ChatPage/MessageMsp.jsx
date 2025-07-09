export default function Messages(props) {
    const { msg, index } = props.values;
    return (
      <>
        <li key={index}>
          <span>{msg.sender}</span> : <span>{msg.content}</span>
        </li>
      </>
    );
  }