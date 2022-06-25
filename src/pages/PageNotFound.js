import React from 'react'

import { useSelector } from 'react-redux'

const PageNotFound = () => {
    const { theme } = useSelector(state => state)

    return (
        <div className='display-4 text-center pt-5' style={{ minHeight: 'calc(100vh - 56px)', ...theme.secondary }}>Page Not Found</div>
    )
}

export default PageNotFound