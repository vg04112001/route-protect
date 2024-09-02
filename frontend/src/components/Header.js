// Header.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDetails } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import "../styles/header.css";
import Cookies from "js-cookie";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sessionId = Cookies.get("authToken");
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch, sessionId]);

  const handleLogout = () => {
    // Dispatch the logout action to clear the state and remove the cookie
    dispatch(logout());

    // Programmatically navigate the user to the login page
    navigate("/login");
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <header>
      <div className="header-status">
        <span>
          {(userInfo || userDetails) && sessionId
            ? `Logged in as ${userInfo ? userInfo.email : userDetails.email}`
            : "You're not logged in"}
        </span>
        <div className="cta">
          {sessionId ? (
            <button className="button" onClick={handleLogout}>
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
        {sessionId ? (
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
