import { useReducer } from "react";

const initialState = {
    blog: {},
    dataLoading: false,
    apiError: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_BLOG":
            return {
                ...state,
                blog: action.payload,
            }
        case "SET_LOADING": return {
            ...state,
            dataLoading: action.payload
        }
        case "SET_API_ERROR": return {
            ...state,
            apiError: action.payload
        }
        case "PREPARE_FETCH": return {
            ...state,
            apiError: "",
            dataLoading: true
        }
        default: return state;
    }
}

const useBlogPostReducer = () => useReducer(reducer, initialState)

export default useBlogPostReducer;