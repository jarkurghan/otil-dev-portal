/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users";
import CreateWord from "./pages/CreateWord";
import SignIn from "./pages/Login";

function App() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${window.location.pathname}`);
  }, []);
  return (
    <div className="App">
      {token ? (
        <>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/new-word" element={<CreateWord />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;
