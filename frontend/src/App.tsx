import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Posts />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/profile" element={<NewPost />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
