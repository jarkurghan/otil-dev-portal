import { configureStore } from "@reduxjs/toolkit";
import roles from "./roles.js";

export const store = configureStore({ reducer: { roles: roles } });
