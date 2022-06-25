import { configureStore } from '@reduxjs/toolkit'

import paginationReducer from "./paginationSlice"
import themeReducer from "./themeSlice"
import toastReducer from './toastSlice'
import userDetailsReducer from './userDetailsSlice'
import blogPostReducer from './blogPostSlice'

const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        theme: themeReducer,
        toast: toastReducer,
        userDetails: userDetailsReducer,
        blogPost: blogPostReducer
    },
})

export default store;