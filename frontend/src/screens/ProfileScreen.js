// ProfileScreen.js
import { useSelector } from "react-redux";
import "../styles/profile.css";

const ProfileScreen = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      {userToken && (
        <div>
          <figure>
            {(userInfo ? userInfo : user)?.firstName.charAt(0).toUpperCase()}
          </figure>
          <span>
            Welcome <strong>{(userInfo ? userInfo : user)?.firstName}!</strong>{" "}
            You can view this page because you're logged in
          </span>
        </div>
      )}
    </>
  );
};
export default ProfileScreen;
