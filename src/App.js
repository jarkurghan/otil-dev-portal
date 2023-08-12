import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Login from "./components/Login";
import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users";

function App() {
  const token = sessionStorage.getItem("token");
  // const secret_key = sessionStorage.getItem("secret_key");
  // const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${window.location.pathname}`);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {token ? (
        <>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
