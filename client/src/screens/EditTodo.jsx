import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTodo } from "../redux/slices/todoSlice";
import { clearError } from "../redux/slices/userSlice";
import "./EditTodo.css";
import { Checkbox } from "primereact/checkbox";

function EditTodo() {
  const { id } = useParams();
  const { todos, loading, error } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let todo = todos.find((todo) => {
    return todo._id == id;
  });
  const toastTopCenter = useRef(null);
  const [updateTodoData, setUpdateTodoData] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
  });

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    if (error !== null) {
      toastTopCenter.current.show({
        severity: "error",
        summary: "Update Error",
        detail: error,
        life: 3000,
      });
      dispatch(clearError());
    }
  }, [navigate, error, dispatch, todos]);

  return (
    <>
      {!loading ? (
        <div className="editTodo">
          <h1>Edit Todo</h1>
          <div className="inputs">
            <span className="p-float-label">
              <InputText
                type="text"
                className="input"
                id="title"
                value={updateTodoData.title}
                onChange={(e) => {
                  setUpdateTodoData((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
              />
              <label htmlFor="title">Title</label>
            </span>
            <span className="p-float-label">
              <InputTextarea
                id="description"
                value={updateTodoData.description}
                className="input"
                onChange={(e) => {
                  setUpdateTodoData((prev) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
                rows={5}
                cols={30}
              />
              <label htmlFor="description">Description</label>
            </span>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
              className="flex align-items-start"
            >
              <Checkbox
                name="status"
                value={updateTodoData.status}
                onChange={(e) => {
                  if (e.checked) {
                    setUpdateTodoData((prev) => {
                      return { ...prev, status: 1 };
                    });
                  } else {
                    setUpdateTodoData((prev) => {
                      return { ...prev, status: 0 };
                    });
                  }
                }}
                checked={updateTodoData.status === 1}
              />
              <label
                style={{
                  marginLeft: "8px",
                  color: updateTodoData.status === 1 ? "green" : "yellow",
                  fontWeight: "bold",
                }}
                htmlFor="status"
                className="ml-2"
              >
                {updateTodoData.status === 1
                  ? "Marked as Completed"
                  : "Mark as Completed"}
              </label>
            </div>
            <Button
              className="button"
              label={"Update"}
              disabled={false}
              onClick={() => {
                dispatch(
                  updateTodo({ id, data: updateTodoData, todos, navigate })
                );
              }}
            />
          </div>
          <Toast ref={toastTopCenter} position="top-center" />
        </div>
      ) : (
        <div className="loading">
          <ProgressSpinner style={{ width: "100px", height: "100px" }} />
        </div>
      )}
    </>
  );
}

export default EditTodo;
