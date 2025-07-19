export default function ChatHeader({ currentGroup, chatUser }) {
  function getAvatarNumber(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return (sum % 35) + 1;
  }
  const selectedUserAvatar = () => {
    if (chatUser) {
      return (
        <img
          src={`https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_${getAvatarNumber(
            chatUser?._id
          )}.png`}
          alt="avater"
        />
      );
    } else {
      return;
    }
  };
  return (
    <div className="text-start text-xl font-bold flex items-center py-2 px-4 border border-gray-300">
      <div className="h-10 w-10 bg-yellow-200 rounded-full mx-2">{selectedUserAvatar()}</div>
      {currentGroup
        ? currentGroup
        : chatUser?.username
        ? chatUser.username
        : "Select Chat"}
    </div>
  );
}
