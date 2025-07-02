export default function MessageForm({
  handleMessageSend,
  messageInput,
  setMessageInput,
}) {
  return (
    <>
      <form onSubmit={handleMessageSend} className="w-[98%]">
        <div className="relative">
          <div className="m-4 border rounded-lg">
            <input
              className="messageInput w-[50%] outline-0"
              type="text"
              placeholder="Message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>

          <button type="submit" className="absolute top-0.5 right-6">Send</button>
        </div>
      </form>
    </>
  );
}
