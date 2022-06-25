import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPage: 1,
    maxPostsPerPage: 5
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.currentPage++
        },
        decrementPage: (state) => {
            state.currentPage--
        },
        resetPage: (state) => {
            state.currentPage = 1
        },
        updateMaxPostsPerPage: (state, action) => {
            state.maxPostsPerPage = action.payload
        }
    },
})

export const { incrementPage, decrementPage, resetPage, updateMaxPostsPerPage } = paginationSlice.actions

export default paginationSlice.reducer