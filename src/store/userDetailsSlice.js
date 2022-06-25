import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { ...JSON.parse(localStorage.getItem('user')) }
}

const userDetailsSlice = createSlice({
    name: "user-details",
    initialState,
    reducers: {
        set: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { set } = userDetailsSlice.actions;
export default userDetailsSlice.reducer