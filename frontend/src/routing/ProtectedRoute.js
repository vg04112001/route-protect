// ProtectedRoute.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // show unauthorized screen if no user is found in redux store
  let sessionId;
  useEffect(() => {
    sessionId = Cookies.get("authToken");
    if (!sessionId) {
      navigate("/login");
    }
  }, [navigate, userInfo, sessionId]);

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
