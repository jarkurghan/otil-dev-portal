import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";
import i18n from "./i18n";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 499) {
            localStorage.clear();
            window.location.replace("/");
        }
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    </>
);
