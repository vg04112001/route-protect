// ProtectedRoute.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // show unauthorized screen if no user is found in redux store
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  // if (!userInfo) {
  //   return (
  //     <div className="unauthorized">
  //       <h1>Unauthorized Access</h1>
  //       <span>
  //         <NavLink to="/login">Login</NavLink> to gain access
  //       </span>
  //     </div>
  //   );
  // }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
