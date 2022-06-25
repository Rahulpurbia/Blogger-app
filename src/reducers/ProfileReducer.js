import { useReducer } from "react";

import { useSelector } from 'react-redux'

const useProfileReducer = () => {
    const { user } = useSelector(state => state.userDetails)
    const { name, username, email, id } = user?.details;
    const initialState = {
        userDetails: {
            name,
            username,
            email,
            id
        },
        dirty: false,
        userDetailsModal: {
            isOpen: false,
            fullscreen: true
        }
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_FIELD": {
                const { fieldName, fieldValue } = action.payload;
                return {
                    ...state,
                    userDetails: {
                        ...state.userDetails,
                        [fieldName]: fieldValue
                    },
                    dirty: true
                }
            }
            case "OPEN_MODAL":
                return {
                    ...state,
                    userDetailsModal: {
                        ...state.userDetailsModal,
                        isOpen: true,
                        fullscreen: action?.payload?.breakpoint
                    }
                }
            case "CLOSE_MODAL": {
                console.log("called")
                return {
                    ...state,
                    userDetailsModal: {
                        ...state.userDetailsModal,
                        isOpen: false
                    }
                }
            }
            case "CLOSE_MODAL_AND_DISCARD_CHANGES":
                return {
                    ...state,
                    userDetails: initialState.userDetails,
                    userDetailsModal: {
                        ...state.userDetailsModal,
                        isOpen: false
                    }
                }
            default: return state;
        }
    }

    return useReducer(reducer, initialState)
}

export default useProfileReducer;