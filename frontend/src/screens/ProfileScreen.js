// ProfileScreen.js
import { useSelector } from "react-redux";
import "../styles/profile.css";
import Cookies from "js-cookie";

const ProfileScreen = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("userDetails"));
  // console.log(user);
  return (
    <>
      {userToken && (
        <div>
          <figure>
            {(userInfo ? userInfo : user)?.firstName.charAt(0).toUpperCase()}
          </figure>
          <span>
            Welcome <strong>{user?.firstName}!</strong> You can view this page
            because you're logged in
          </span>
        </div>
      )}
    </>
  );
};
export default ProfileScreen;
