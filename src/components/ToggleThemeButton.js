import React from 'react'

import { Image } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'

import { toggle } from '../store/themeSlice';

const ToggleThemeButton = (props) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state)

    return (
        <Image style={{ position: "fixed", bottom: "0.5em", right: "0.5em", zIndex: "3", height: "2em" }}
            onClick={() => dispatch(toggle())}
            title="Change Theme"
            src={theme.icon} />
    )
}

export default ToggleThemeButton