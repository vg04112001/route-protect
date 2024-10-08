// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// "https://route-protect.onrender.com"
const backendURL = "http://localhost:5000";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        { email, password },
        config
      );
      // console.log("Response: ", data);
      // store user's token in local storage
      // localStorage.setItem("userToken", JSON.stringify(data));
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getDetails",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("userToken");

      // Configure header's Authorization with the token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call to get user details
      const { data } = await axios.get(
        `${backendURL}/api/user/profile`,
        config
      );

      localStorage.setItem("userDetails", JSON.stringify(data));

      return data;
    } catch (error) {
      // Return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
