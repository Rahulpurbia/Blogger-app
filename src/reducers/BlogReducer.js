import { useReducer } from "react";

const initialState = {
    blogs: {
        records: [],
        totalCount: 0
    },
    users: {
        records: [],
        totalCount: 0
    },
    dataLoading: false,
    apiError: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_BLOGS":
            return {
                ...state,
                blogs: action.payload,
                users: {}
            }
        case "SET_USERS": return {
            ...state,
            users: action.payload,
            blogs: {}
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
            dataLoading: true,
            apiError: "",
        }

        default: return state;
    }
}

const useBlogReducer = () => useReducer(reducer, initialState)

export default useBlogReducer;