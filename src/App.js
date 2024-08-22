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
import LanguagesPage from "./pages/Languages";
import WordsPage from "./pages/Words";
import ResourcesPage from "./pages/Resources";
import CreateResource from "./pages/CreateResource";
import WordDetailsPage from "./pages/WordDetails";
import CreateUserPage from "./pages/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { getRole, setRole } from "./store/roles";

function App() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roles = useSelector(getRole);

    useEffect(() => {
        navigate(`${window.location.pathname}`);
        if (token) dispatch(setRole((localStorage.getItem("roles") || "").split(",")));
    }, []);

    return (
        <div>
            {token ? (
                <>
                    <Header />
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Navigate to="/words" />} />
                        {roles.includes("Create word") && <Route path="/new-word" element={<CreateWord />} />}
                        <Route path="/words" element={<WordsPage />} />
                        <Route path="/words/:id/:page" element={<WordDetailsPage />} />
                        <Route path="/languages" element={<LanguagesPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        {roles.includes("Create resource") && <Route path="/create-resource" element={<CreateResource />} />}
                        {roles.includes("View users") && <Route path="/users" element={<Users />} />}
                        {roles.includes("Create user") && <Route path="/create-user" element={<CreateUserPage />} />}
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Routes>
                </>
            ) : (
                <SignIn />
            )}
        </div>
    );
}

export default App;
