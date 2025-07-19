export default function ChatInput({
  message,
  handleMessageSend,
  handleMessageInputChange,
}) {
  return (
    <div className="w-full">
      <form onSubmit={handleMessageSend}>
        <input
          value={message}
          onChange={handleMessageInputChange}
          type="text"
          placeholder="Message..."
          className="text-lg m-2 w-[90%] p-2 border rounded"
        />
        <button type="submit" className="border p-2 m-1 cursor-pointer rounded">
          send
        </button>
      </form>
    </div>
  );
}
