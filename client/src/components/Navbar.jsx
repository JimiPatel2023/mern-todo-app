import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import "primeicons/primeicons.css";
import { logoutUser } from "../redux/slices/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const menuRight = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated, validUser, user } = useSelector(
    (state) => state.user
  );

  const items = [
    {
      label: "User Info",
      items: [
        {
          label: `${user?.name}`,
          icon: "pi pi-user",
        },
      ],
    },
    {
      label: "Options",
      items: [
        {
          label: "ADD NEW TODO",
          icon: "pi pi-plus",
          command: () => {
            navigate("/todo/new");
          },
        },
      ],
    },
    {
      label: "Logout",
      items: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            dispatch(logoutUser(dispatch));
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          Todos By Jimi
        </h1>
        {user ? (
          <div>
            <Menu
              model={items}
              popup
              ref={menuRight}
              id="popup_menu_right"
              popupAlignment="right"
            />
            <div
              onClick={(event) => menuRight.current.toggle(event)}
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-color)",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "44px",
                padding: "4px 5px 12px 5px",
                cursor: "pointer",
              }}
              className="profile"
            >
              {user.name[0]}
            </div>
          </div>
        ) : (
          <div className="buttons">
            <Button
              onClick={() => {
                navigate("/login");
              }}
              icon="pi pi-sign-in"
              label="Login"
              outlined
              size="large"
              className="mybutton"
            />
            <Button
              onClick={() => {
                navigate("/register");
              }}
              icon="pi pi-sign-out"
              label="Sign Up"
              outlined
              size="large"
              className="mybutton"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
