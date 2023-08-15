import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./redux/slices/userSlice";
import EditTodo from "./screens/EditTodo";
import NewTodo from "./screens/NewTodo";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, validUser, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user == null) {
      dispatch(verifyUser());
    }
  }, [dispatch, user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo/edit/:id" element={<EditTodo />} />
        <Route path="/todo/new" element={<NewTodo />} />
      </Routes>
    </>
  );
}

export default App;
