import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const blogPostSlice = createSlice({
    name: "blog-post",
    initialState,
    reducers: {
        update: (state, action) => {
            return state = action.payload
        }
    }
})

export const { update } = blogPostSlice.actions;
export default blogPostSlice.reducer