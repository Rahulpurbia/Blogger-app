import { useReducer } from "react";

import { useSelector } from 'react-redux'

const getTodaysDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

const useBlogEditorReducer = () => {
    const { user } = useSelector(state => state.userDetails)
    const initialState = {
        blog: {
            userId: user?.details?.id,
            title: {
                value: "",
                dirty: false,
                error: "",
                getIssue: (val) => !val.trim()
                    ? "Title is required" : ""
            },
            body: {
                value: "",
                dirty: false,
                error: "",
                getIssue: (val) => val.trim().length < 50
                    ? "Body must contain atleast 50 characters" : ""
            },
            date: getTodaysDate(),
            likes: [],
            author: user?.details?.name
        },
        isDirty: false
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_FIELD": {
                const { fieldName, fieldValue, errorIfAny } = action?.payload
                return {
                    ...state,
                    blog: {
                        ...state.blog,
                        [fieldName]: {
                            ...state.blog[fieldName],
                            value: fieldValue,
                            dirty: true,
                            error: errorIfAny
                        }
                    },
                    isDirty: true
                }
            }
            case "CANCEL_CREATE_POST":
                return {
                    ...state,
                    blog: {}
                }
            case "SET_BLOG_TO_EDIT": {
                const { blogData } = action.payload;
                return {
                    ...state,
                    blog: {
                        ...state.blog,
                        title: {
                            ...state.blog.title,
                            value: blogData.title
                        },
                        body: {
                            ...state.blog.body,
                            value: blogData.body
                        }
                    }
                }
            }
            default: return state;
        }
    }

    return useReducer(reducer, initialState)
}
export default useBlogEditorReducer;