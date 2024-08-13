// RegisterScreen.js
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { registerUser } from "../features/auth/authActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" className="form-input" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-input" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register("confirmPassword")}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? <div>Spinner</div> : "Register"}
      </button>
    </form>
  );
};
export default RegisterScreen;
