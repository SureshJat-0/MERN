export default function ChatHeader({ currentGroup, chatUser}) {
  return (
    <div className="text-center text-2xl m-2">
      {currentGroup
        ? currentGroup
        : chatUser?.username
        ? chatUser.username
        : "Select Chat"}
    </div>
  );
}
