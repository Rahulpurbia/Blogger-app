import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: []
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        show: (state, action) => {
            state.notification = [{ ...action.payload }]
        },
        hide: (state) => {
            state.notification = []
        }

    }
})

export const { show, hide } = toastSlice.actions;
export default toastSlice.reducer;