import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const res = await axios.get("/api/history", { withCredentials: true });
      setHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {history.length === 0 ? (
            <div className="flex justify-center m-4 text-xl">
            No history found
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center m-4">
              <h1 className="text-3xl font-bold mb-2">History</h1>
              <table className="table-auto w-[90vw] text-left border-collapse border border-gray-300 backdrop-blur-md">
                <thead className="bg-purple-400/30">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Player</th>
                    <th className="border border-gray-300 px-4 py-2">Game</th>
                    <th className="border border-gray-300 px-4 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((game, ind) => (
                    <tr key={ind} className="bg-white/20 backdrop-blur-sm">
                      <td className="border border-gray-300 px-4 py-2">
                        {game.player?.username}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {game.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {game.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
