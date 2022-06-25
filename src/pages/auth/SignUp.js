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
    const [signupDetails, setSignupDetails] = useState({
        name: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim() ? "name is required" : ""
        },
        username: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim() ? "username is required" : ""
        },
        email: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim() ? "email is required" : ""
        },
        password: {
            value: "",
            dirty: false,
            error: "",
            getIssue: (val) => !val.trim() ? "password is required" : ""
        }
    })

    const updateField = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const errorIfAny = signupDetails[fieldName].getIssue
            ? signupDetails[fieldName].getIssue(fieldValue) : "";
        setSignupDetails({
            ...signupDetails,
            [fieldName]: {
                ...signupDetails[fieldName],
                value: fieldValue,
                dirty: true,
                error: errorIfAny
            }
        })
    }

    const validateAndCreateUser = (e) => {
        e.preventDefault();
        AuthServices.getUserByEmail(signupDetails.email.value)
            .then(data => data.json())
            .then(user => {
                if (user[0]) {
                    dispatch(show({ type: 'warning', title: "Error", message: "Email id already registered!" }))
                }
                else {
                    const { name, username, email, password } = signupDetails;
                    const userDetails = {
                        name: name.value,
                        username: username.value,
                        email: email.value,
                        password: password.value
                    }
                    AuthServices.createUser(userDetails)
                        .then(data => data.json())
                        .then(response => {
                            if (response?.id) {
                                const { id, name, username, email } = response;
                                dispatch(set({ details: { id, name, username, email } }));
                                navigate('/account/dashboard')
                                dispatch(show({ type: 'success', title: "Success!", message: "Successfully created account" }))
                            }
                        })
                }
            })
            .catch(error => dispatch(show({ type: 'danger', title: "Error!", message: error.message || error })))
    }

    const isSubmitButtonDisabled = () => {
        const buttonDisabled = Object.values(signupDetails)
            .map((field) => ({ dirty: field.dirty, error: field.error }))
            .some((data) => !data.dirty || data.error.length > 0);

        setIsBtnDisabled(buttonDisabled);
    };

    useEffect(() => {
        isSubmitButtonDisabled();
    }, [signupDetails]);

    return (
        <div className='px-3 d-flex justify-content-center align-items-center'
            style={{ minHeight: "calc(100vh - 56px)", ...theme.secondary }}>
            <Form style={{
                maxWidth: '55em',
                ...theme.primary
            }} className="d-flex flex-column flex-grow-1 justify-content-center  p-5 border rounded border-primary">
                <h3 className='mb-4 mx-auto'>SignUp</h3>
                <div className='d-flex justify-content-between' style={{ gap: "1em" }}>
                    <Form.Group className="mb-3"
                        style={{ flexGrow: "1" }}
                        controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="eg:- Ramesh"
                            name="name"
                            value={signupDetails.name.value}
                            onChange={updateField}
                            isInvalid={signupDetails.name.error}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {signupDetails.name.error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3"
                        style={{ flexGrow: "1" }}
                        controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="eg:- Ramesh2343"
                            name="username"
                            value={signupDetails.username.value}
                            onChange={updateField}
                            isInvalid={signupDetails.username.error}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {signupDetails.username.error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3"
                    controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        placeholder="someone@gmail.com"
                        name="email"
                        value={signupDetails.email.value}
                        onChange={updateField}
                        isInvalid={signupDetails.email.error}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {signupDetails.email.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"
                    controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Create password"
                        name="password"
                        value={signupDetails.password.value}
                        onChange={updateField}
                        isInvalid={signupDetails.password.error} />
                    <Form.Control.Feedback type='invalid'>
                        {signupDetails.password.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"
                    controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary"
                    onClick={validateAndCreateUser}
                    style={{ maxWidth: "50%", textAlign: 'center', fontSize: "clamp(12px,2.4vw,16px)" }}
                    className="mx-auto px-4 py-2"
                    disabled={isBtnDisabled}>
                    SignUp
                </Button>
                <Link style={{ width: "max-content" }} to='/auth/login'>Login</Link>
            </Form >
        </div>
    )
}

export default Login