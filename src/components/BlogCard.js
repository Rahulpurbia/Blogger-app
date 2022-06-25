import React from 'react'

import { useSelector } from 'react-redux'

import { Card, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const { theme } = useSelector(state => state)
    const { title, date, user } = blog;

    const showBlog = (e) => {
        navigate(`/${blog.id}`, { state: { blog } })
    }

    return (
        <Card style={{ maxWidth: "55em", height: "max-content", minHeight: "9em", ...theme.primary }}
            className="mx-auto p-1 my-3">
            <div className='d-flex justify-content-between' style={{ gap: "1em" }}>
                <small>Published On: {date}</small>
                <small>Author: {user?.name}</small>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-4">{title}</Card.Title>
                <Button size="sm" className="align-self-end"
                    onClick={showBlog}>View Post</Button>
            </Card.Body>
        </Card>
    )
}

export default BlogCard