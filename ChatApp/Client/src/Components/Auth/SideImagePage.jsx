export default function SideImagePage({ pageName }) {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/b7/33/c4/b733c4edae153243ea5534f1b916b7ba.jpg')",
      }}
      className={`w-[48vw] h-full bg-cover bg-center rounded-tl-4xl rounded-bl-4xl`}
    >
      <div className="flex flex-col justify-center items-right text-2xl w-full h-full px-16 tracking-wider">
        <h1 className="text-4xl font-bold text-white my-4 mb-4">
          <span className="mb-1">{pageName} your</span>
          <br />
          <span>account</span>
        </h1>
        <p className="text-2xl text-gray-200 font-semibold">
          <span>Ready to chat, share, and connect?</span>
          <br />
          <span>Just log in and start talking!</span>
        </p>
      </div>
    </div>
  );
}
