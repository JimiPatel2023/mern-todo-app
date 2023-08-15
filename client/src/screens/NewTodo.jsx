import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, updateTodo } from "../redux/slices/todoSlice";
import { clearError } from "../redux/slices/userSlice";
import "./EditTodo.css";
import { Checkbox } from "primereact/checkbox";

function NewTodo() {
  const { todos, loading, error } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastTopCenter = useRef(null);
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    if (error !== null) {
      toastTopCenter.current.show({
        severity: "error",
        summary: "Error",
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
          <h1>Create New Todo</h1>
          <div className="inputs">
            <span className="p-float-label">
              <InputText
                type="text"
                className="input"
                id="title"
                value={todoData.title}
                onChange={(e) => {
                  setTodoData((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
              />
              <label htmlFor="title">Title</label>
            </span>
            <span className="p-float-label">
              <InputTextarea
                id="description"
                value={todoData.description}
                className="input"
                onChange={(e) => {
                  setTodoData((prev) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
                rows={5}
                cols={30}
              />
              <label htmlFor="description">Description</label>
            </span>
            <Button
              className="button"
              label={"Create"}
              disabled={false}
              onClick={() => {
                dispatch(createTodo({ data: todoData, todos, navigate }));
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

export default NewTodo;
