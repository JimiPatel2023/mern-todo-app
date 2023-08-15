import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./Login.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  registerUser,
  setLoading,
  verifyUser,
} from "../redux/slices/userSlice";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const toastTopCenter = useRef(null);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { isAuthenticated, loading, error, validUser, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(setLoading(true));
    if (user == null) {
      dispatch(verifyUser());
    } else {
      navigate("/");
    }
    if (error) {
      toastTopCenter.current.show({
        severity: "error",
        summary: "Register Error",
        detail: error,
        life: 3000,
      });
      dispatch(clearError());
    }
    dispatch(setLoading(false));
  }, [isAuthenticated, navigate, dispatch, error, validUser, user]);

  const handleRegister = () => {
    dispatch(registerUser(registerData));
  };

  return !loading ? (
    <div className="login">
      <div className="title">
        <h1>Register</h1>
      </div>
      <div className="inputs">
        <span className="p-float-label">
          <InputText
            value={registerData.name}
            className="input"
            id="name"
            onChange={(e) => {
              setRegisterData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <label htmlFor="name">Name</label>
        </span>
        <span className="p-float-label">
          <InputText
            type="email"
            className="input"
            value={registerData.email}
            id="email"
            onChange={(e) => {
              setRegisterData((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <label htmlFor="email">Email</label>
        </span>
        <span className="p-float-label">
          <InputText
            className="input"
            id="password"
            value={registerData.password}
            onChange={(e) => {
              setRegisterData((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            type="password"
          />
          <label htmlFor="password">Password</label>
        </span>
        <Button
          onClick={handleRegister}
          className="button"
          label="Create an Account"
        />
      </div>
      <Toast ref={toastTopCenter} position="top-center" />
    </div>
  ) : (
    <div className="loading">
      <ProgressSpinner style={{ width: "100px", height: "100px" }} />
    </div>
  );
}

export default Register;
