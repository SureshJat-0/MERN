export default function MessageForm({
  handleMessageSend,
  messageInput,
  setMessageInput,
}) {
  return (
    <>
      <form onSubmit={handleMessageSend}>
        <input
          className="messageInput"
          type="text"
          placeholder="Message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
