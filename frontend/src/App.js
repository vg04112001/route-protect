import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";
import ProtectedRoute from "./routing/ProtectedRoute";

function App() {
  return (
    <>
      <Header />
      <main className="container content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<ProfileScreen />} />
          </Route>
          <Route path="*" element={<div>No route path found</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
