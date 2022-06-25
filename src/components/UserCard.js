import React from 'react'

import { useSelector } from 'react-redux'

import { Card, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const { theme } = useSelector(state => state)
    const { id, name, email } = user;

    const showUsers = (e) => {
        navigate(`/authors/${id}`)
    }

    return (
        <Card style={{ maxWidth: "55em", height: "max-content", minHeight: "9em", ...theme.primary }}
            className="mx-auto p-1 my-3  w-75">
            <Card.Body className="d-flex flex-column">
                <div> Name: {name}</div>
                <div> Email: {email}</div>
                <Button size="sm" className="align-self-end"
                    onClick={showUsers}>View Posts</Button>
            </Card.Body>
        </Card>
    )
}

export default UserCard