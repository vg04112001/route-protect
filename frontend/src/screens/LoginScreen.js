// LoginScreen.js
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Error from "../components/Error";
import FormInput from "../components/FormInput";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";

const schema = yup
  .object({
    email: yup
      .string()
      .required()
      .matches(
        "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
        "please enter valid email format"
      ),
    password: yup
      .string()
      .required()
      .min(3, "must be at least 3 characters long"),
  })
  .required();

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, userInfo, error, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  let sessionId;
  useEffect(() => {
    sessionId = Cookies.get("authToken");
    if (userToken || sessionId) {
      navigate("/user-profile");
    }
  }, [sessionId, userToken]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
    setTimeout(() => {
      console.log("setTimeout works....");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userDetails");
    }, 110000);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <FormInput
        label="Email"
        name="email"
        register={register}
        errors={errors}
        type={"email"}
      />
      <FormInput
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type={showPassword ? "text" : "password"}
        suffixIcon={
          showPassword ? (
            <IoEye
              onClick={() => setShowPassword((s) => !s)}
              style={{ position: "absolute", right: "15px", top: "30px" }}
            />
          ) : (
            <IoEyeOff
              onClick={() => setShowPassword((s) => !s)}
              style={{ position: "absolute", right: "15px", top: "30px" }}
            />
          )
        }
      />
      <button type="submit" className="button" disabled={loading}>
        {loading ? <div>Spinner</div> : "Login"}
      </button>
    </form>
  );
};
export default LoginScreen;
