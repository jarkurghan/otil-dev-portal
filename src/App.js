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
import MyWordsPage from "./pages/MyWords";
import ResourcesPage from "./pages/Resources";
import CreateResource from "./pages/CreateResource";
import WordDetailsPage from "./pages/WordDetails";

function App() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`${window.location.pathname}`);
    }, []);
    return (
        <div>
            {token ? (
                <>
                    <Header />
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Navigate to="/users" />} />
                        <Route path="/new-word" element={<CreateWord />} />
                        <Route path="/words" element={<MyWordsPage />} />
                        <Route path="/words/:id/:page" element={<WordDetailsPage />} />
                        <Route path="/languages" element={<LanguagesPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/create-resource" element={<CreateResource />} />
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
