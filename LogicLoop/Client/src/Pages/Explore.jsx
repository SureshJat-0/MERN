import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div className="p-12">
      <div className="grid grid-cols-4 gap-8">
        
        <Link to="/explore/quiz">
          <div className="rounded-lg cursor-pointer shadow-lg hover:scale-105  transition-transform duration-500 bg-white/30 backdrop-blur-sm">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="quiz-game"
            />
            <p className="mx-6 my-2 pb-2">Quiz Game &gt;</p>
          </div>
        </Link>

        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
}
