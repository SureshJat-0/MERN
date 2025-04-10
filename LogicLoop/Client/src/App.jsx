import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Quiz from "./Components/Quiz/Quiz";

function App() {
  return (
    <div
      className="h-screen flex flex-col  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1681433426886-3d6d17f79d53?q=80&w=3229&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
