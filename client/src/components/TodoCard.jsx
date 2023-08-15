import React from "react";
import { Card } from "primereact/card";
import "./TodoCard.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function TodoCard({ title, description, status, id, confirmDelete }) {
  const navigate = useNavigate();
  return (
    <Card className="todocard" title={title}>
      <p className="m-0">{description}</p>
      <h3
        style={{ color: status === 0 ? "yellow" : "green" }}
        className="status m-0"
      >
        Status : {status === 0 ? "pending" : "completed"}
      </h3>
      <span className="p-buttonset">
        <Button
          onClick={() => {
            navigate(`/todo/edit/${id}`);
          }}
          label="Edit"
          icon="pi pi-pencil"
        />
        <Button
          onClick={() => {
            confirmDelete(id);
          }}
          label="Delete"
          icon="pi pi-trash"
        />
      </span>
    </Card>
  );
}

export default TodoCard;
