import React from 'react'

import "./ToastContainer.css"

import { useSelector, useDispatch } from 'react-redux'

import { Toast } from 'react-bootstrap';

import { hide } from '../store/toastSlice';

const ToastContainer = () => {
    const { notification } = useSelector(state => state.toast)
    const dispatch = useDispatch();

    return (
        notification.length !== 0
        && <div className='fixed-top-right' style={{ width: "max-content", animation: "animate-toast 0.3s ease-in-out" }}>
            {
                notification.map((toast, index) =>
                    <Toast key={index} onClose={() => dispatch(hide())} className={` bg-${toast.type} `}>
                        <Toast.Header>
                            <strong className="me-auto">{toast.title}!</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                )
            }
        </div>
    )
}

export default ToastContainer