import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import "./style.css"

import { Button, Modal, Form } from 'react-bootstrap'

import { set } from '../../../store/userDetailsSlice'
import { show } from '../../../store/toastSlice'

import useProfileReducer from '../../../reducers/ProfileReducer'

import AuthServices from '../../../services/AuthServices'

const Profile = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state)
    const [state, profileDispatch] = useProfileReducer();
    const { userDetails, userDetailsModal, dirty } = state;
    const { name, username, email, id: userId } = userDetails
    const { isOpen, fullscreen } = userDetailsModal

    const updateField = (e) => {
        const fieldValue = e.target.value;
        const fieldName = e.target.name;
        profileDispatch({ type: "UPDATE_FIELD", payload: { fieldName, fieldValue } })
    }

    const openUserDetailsEditor = (breakpoint) => {
        profileDispatch({ type: "OPEN_MODAL", payload: { breakpoint } })
    }

    const closeAndDiscardUserDetailsModal = () => {
        profileDispatch({ type: "CLOSE_MODAL_AND_DISCARD_CHANGES" })
    }

    const updateUserDetails = (e) => {
        e.preventDefault();
        AuthServices.updateUserDetails(userId, userDetails)
            .then(data => {
                if (data?.ok) {
                    profileDispatch({ type: "CLOSE_MODAL" })
                    dispatch(show({ type: 'success', title: 'Success', message: "Successfully updated profile" }))
                    return data.json();
                }
            })
            .then(userData => {
                const { id, name, email, username } = userData;
                dispatch(set({ details: { id, name, username, email } }));
            })
            .catch(console.log)
    }

    return (
        <div className="py-5 px-3 text-white d-flex justify-content-center"
            style={{ minHeight: "calc(100vh - 56px", ...theme.secondary }}>
            <div className='d-flex flex-column  p-4'
                style={{ ...theme.primary, maxWidth: "55em", flexGrow: '1' }}
                id='profile-section'>
                <h3>User Details</h3>
                <div className='text-start'>
                    <div>Name: {name} </div>
                    <div>Username: {username}</div>
                    <div>Email: {email}</div>
                </div>
                <Button size="sm"
                    className="my-3 py-1 px-3"
                    onClick={() => openUserDetailsEditor('md-down')}
                    style={{ width: "max-content" }}>
                    Edit
                </Button>
            </div>
            <Modal show={isOpen}
                fullscreen={fullscreen}
                onHide={closeAndDiscardUserDetailsModal}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateUserDetails}>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text"
                                required
                                placeholder="eg-Joe Doe"
                                name="name"
                                value={name}
                                onChange={updateField}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text"
                                placeholder="JoeDoe12"
                                required
                                name="username"
                                value={username}
                                onChange={updateField}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email"
                                required
                                placeholder="name@example.com"
                                name="email"
                                value={email}
                                onChange={updateField}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end" style={{ gap: "1em" }}>
                            <Button
                                onClick={closeAndDiscardUserDetailsModal}
                                size="sm" variant='danger'>Cancel</Button>
                            <Button type='submit'
                                disabled={!dirty}
                                size="sm" >Update</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile