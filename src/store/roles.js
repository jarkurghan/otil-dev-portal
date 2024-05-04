import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setRole } = resultSlice.actions;

export const getRole = (state) => {
    return state.roles.value;
};

export default resultSlice.reducer;
