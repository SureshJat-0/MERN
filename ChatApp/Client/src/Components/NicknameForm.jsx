export default function NicknameForm({
  handleNicknameSet,
  nicknameInput,
  setNicknameInput,
}) {
  return (
    <>
      <form onSubmit={handleNicknameSet}>
        <input
          className="messageInput"
          type="text"
          placeholder="Nickname..."
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
        />
        <button type="submit">Set</button>
      </form>
    </>
  );
}
