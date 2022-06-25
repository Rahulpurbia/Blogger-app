import React, { useState, useEffect } from 'react'

import { Form, Button } from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { set } from '../../store/userDetailsSlice'
import { show } from '../../store/toastSlice';

import AuthServices from '../../services/AuthServices';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector(state => state)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [loginDetails, setLoginDetails] = useState({
        email: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim()
                ? "email is required" : ""
        },
        password: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim()
                ? "password is required" : ""
        }
    })

    const updateField = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const errorIfAny = loginDetails[fieldName].getIssue
            ? loginDetails[fieldName].getIssue(fieldValue) : "";
        setLoginDetails({
            ...loginDetails,
            [fieldName]: {
                ...loginDetails[fieldName],
                value: fieldValue,
                dirty: true,
                error: errorIfAny
            }
        })
    }

    const validateUser = (e) => {
        e.preventDefault();
        AuthServices.getUserByEmail(loginDetails.email.value)
            .then(data => data.json())
            .then(user => {
                if (user[0] && user[0].password === loginDetails.password.value) {
                    const { id, name, username, email } = user[0];
                    dispatch(set({ details: { id, name, username, email } }));
                    navigate('/account/dashboard')
                    dispatch(show({ type: 'success', title: "Success!", message: "Successfully logged in" }))
                }
                else {
                    dispatch(show({ type: "warning", title: "Error", message: "Incorrect credentials" }))
                }
            })
            .catch(error => dispatch(show({ type: 'danger', title: "Error!", message: error.message || error })))
    }

    const isSubmitButtonDisabled = () => {
        const buttonDisabled = Object.values(loginDetails)
            .map((field) => ({ dirty: field.dirty, error: field.error }))
            .some((data) => !data.dirty || data.error.length > 0);

        setIsBtnDisabled(buttonDisabled);
    };

    useEffect(() => {
        isSubmitButtonDisabled();
    }, [loginDetails]);

    return (
        <div className='px-3 d-flex justify-content-center align-items-center'
            style={{ minHeight: "calc(100vh - 56px)", ...theme.secondary }}>
            <Form style={{
                maxWidth: '55em',
                ...theme.primary
            }} className="d-flex flex-column flex-grow-1 justify-content-center  p-5 border rounded border-primary">
                <h3 className='mb-4 mx-auto'>LOGIN</h3>
                <Form.Group className="mb-3"
                    controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        placeholder="someone@gmail.com"
                        name="email"
                        value={loginDetails.email.value}
                        onChange={updateField}
                        isInvalid={loginDetails.email.error}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {loginDetails.email.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"
                    controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={loginDetails.password.value}
                        onChange={updateField}
                        isInvalid={loginDetails.password.error} />
                    <Form.Control.Feedback type='invalid'>
                        {loginDetails.password.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"
                    controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary"
                    onClick={validateUser}
                    style={{ maxWidth: "50%", textAlign: 'center', fontSize: "clamp(12px,2.4vw,16px)" }}
                    className="mx-auto px-4 py-2"
                    disabled={isBtnDisabled}>
                    Login
                </Button>
                <Link style={{ width: "max-content" }} to='/auth/signup'>SignUp</Link>
            </Form >
        </div>
    )
}

export default Login