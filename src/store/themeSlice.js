import { createSlice } from '@reduxjs/toolkit'

import moonSvg from "../assets/images/light.svg"
import sunSvg from "../assets/images/dark.svg"


const themes = {
    light: {
        primary: {
            backgroundColor: "white",
            color: "black"
        },
        secondary: {
            backgroundColor: "#e4e4e4",
            color: "black"
        },
        input: {
            backgroundColor: "#f6f6f6",
            color: "black"
        },
        darkIcon: {
            filter: "none"
        },
        icon: sunSvg
    },
    dark: {
        primary: {
            backgroundColor: "#212529",
            color: "white"
        },
        secondary: {
            backgroundColor: "#444",
            color: "white"
        },
        input: {
            backgroundColor: "#747070",
            color: "white"
        },
        darkIcon: {
            filter: "invert(1)"
        },
        icon: moonSvg
    }
}

const initialState = themes[localStorage.getItem('theme')] ?? themes.dark

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            const theme = (JSON.stringify(state) === JSON.stringify(themes.dark) ? "light" : "dark");
            localStorage.setItem('theme', theme);
            return state = (JSON.stringify(state) === JSON.stringify(themes.dark) ? themes.light : themes.dark)
        }
    },
})

export const { toggle } = themeSlice.actions

export default themeSlice.reducer