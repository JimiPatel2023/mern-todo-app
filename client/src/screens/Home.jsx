import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import { deleteTodo, getTodos } from "../redux/slices/todoSlice";
import "./Home.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { todos, error, loading } = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmDelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this Todo?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        dispatch(deleteTodo({ id, todos }));
      },
      reject: () => {},
    });
  };

  useEffect(() => {
    if (user !== null) {
      dispatch(getTodos());
    }
  }, [user, error]);

  return (
    <>
      <div className="home">
        <h1 style={{ textAlign: "center" }}>Welcome to My MERN Todo Project</h1>
        <ConfirmDialog />
        <div className="todos">
          {!loading ? (
            todos &&
            todos.map((todo) => {
              return (
                <TodoCard
                  key={todo._id}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                  id={todo._id}
                  confirmDelete={confirmDelete}
                />
              );
            })
          ) : (
            <div className="loading">
              <ProgressSpinner style={{ width: "100px", height: "100px" }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
