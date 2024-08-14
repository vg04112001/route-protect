// Header.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserDetails } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import "../styles/header.css";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>
          {userInfo ? `Logged in as ${userInfo.email}` : "You're not logged in"}
        </span>
        <div className="cta">
          {userInfo ? (
            <button className="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="container navigation">
        <NavLink to="/">Home</NavLink>
        {userInfo ? (
          <NavLink to="/user-profile">Profile</NavLink>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        {/* {userInfo && <NavLink to="/user-profile">Profile</NavLink>} */}
      </nav>
    </header>
  );
};
export default Header;
