// RegisterScreen.js
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { registerUser } from "../features/auth/authActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";
import FormInput from "../components/FormInput";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required()
      .matches(
        "^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$",
        "please enter valid username format"
      ),
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
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/,
        "Must contain at least one number, one uppercase and lowercase letter, and at least 3 or more characters"
      ),
  })
  .required();

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, userInfo, error, success } = useSelector(
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

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/user-profile");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <FormInput
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
      />
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
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        register={register}
        errors={errors}
        type={"password"}
      />
      <button
        type="submit"
        className={`button ${showPassword ? "disabled" : ""}`}
        disabled={loading}
      >
        {loading ? <div>Spinner</div> : "Register"}
      </button>
    </form>
  );
};
export default RegisterScreen;
