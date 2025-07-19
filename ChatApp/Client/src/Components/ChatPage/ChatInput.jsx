import SendIcon from '@mui/icons-material/Send';

export default function ChatInput({
  message,
  handleMessageSend,
  setMessage,
}) {
  return (
    <form onSubmit={handleMessageSend} className="w-full flex flex-row">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Message..."
        className="text-gray-600 font-semibold ms-4 my-2 grow px-4 py-2 border border-gray-300 rounded outline-0"
      />
      <button
        type="submit"
        className="p-4 m-2 cursor-pointer rounded-xl bg-[#5C63B6] font-bold text-white flex items-center justify-center"
      >
        <SendIcon />
      </button>
    </form>
  );
}
