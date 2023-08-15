import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./Login.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginUser,
  setLoading,
  verifyUser,
} from "../redux/slices/userSlice";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const toastTopCenter = useRef(null);

  const [loginData, setLoginData] = useState({
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
    if (error !== null) {
      toastTopCenter.current.show({
        severity: "error",
        summary: "Login Error",
        detail: error,
        life: 3000,
      });
      dispatch(clearError());
    }
    dispatch(setLoading(false));
  }, [isAuthenticated, navigate, dispatch, error, user]);

  const handleLogin = () => {
    dispatch(loginUser(loginData));
  };

  return !loading ? (
    <div className="login">
      <div className="title">
        <h1>Login</h1>
      </div>
      <div className="inputs">
        <span className="p-float-label">
          <InputText
            type="email"
            className="input"
            id="email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData((prev) => {
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
            onChange={(e) => {
              setLoginData((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            value={loginData.password}
            type="password"
          />
          <label htmlFor="password">Password</label>
        </span>
        <Button
          className="button"
          label={"Login"}
          disabled={false}
          onClick={handleLogin}
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

export default Login;
