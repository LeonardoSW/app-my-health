import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import editarSlice from "./editarSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        editar: editarSlice
    }
})