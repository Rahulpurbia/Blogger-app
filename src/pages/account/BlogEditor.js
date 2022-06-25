import React, { useState, useEffect, useRef } from 'react'

import { Button, Form } from 'react-bootstrap'

import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux"

import { show } from '../../store/toastSlice'

import useBlogEditorReducer from '../../reducers/BlogEditorReducer'

import BlogService from '../../services/BlogService'

const BlogEditor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state)
    const { state } = useLocation();
    const { blogId } = useParams();
    const [editorState, blogEditorDispatch] = useBlogEditorReducer();
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const { userId, title, body, date, author, likes } = editorState.blog;
    const blogPost = {
        userId,
        title: title.value,
        body: body.value,
        date,
        likes,
        author
    };

    const updateField = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const errorIfAny = editorState.blog[fieldName].getIssue
            ? editorState.blog[fieldName].getIssue(fieldValue) : "";
        blogEditorDispatch({ type: 'UPDATE_FIELD', payload: { fieldName, fieldValue, errorIfAny } })
    }

    const handleCancel = () => {
        blogEditorDispatch({ type: "CANCEL_CREATE_POST" })
        navigate('/account/dashboard')
    }

    const createPost = () => {
        BlogService.posts.create(blogPost)
            .then(data => {
                data.ok
                    ? dispatch(show({ type: 'success', title: "Success!", message: "Successfully created the post" }))
                    : dispatch(show({ type: 'warning', title: "Oops!", message: "Some error occured please try again later" }))
                navigate('/account/dashboard')
            })
            .catch(error => dispatch(show({ type: 'danger', title: "Error", message: error.message || error })))
    }

    const updatePost = () => {
        BlogService.posts.update(blogId, blogPost)
            .then(data => {
                data.ok
                    ? dispatch(show({ type: 'success', title: "Success!", message: "Successfully updated the post" }))
                    : dispatch(show({ type: 'warning', title: "Oops!", message: "Some error occured please try again later" }))
                navigate('/account/dashboard')
            })
            .catch(error => dispatch(show({ type: 'danger', title: "Error", message: error.message || error })))
    }

    const isSubmitButtonDisabled = () => {
        const buttonDisabled = Object.values(editorState.blog)
            .filter(field => field.hasOwnProperty('dirty') || field.hasOwnProperty('error'))
            .map((field) => ({ dirty: field?.dirty, error: field?.error }))
            .some((data) => !data.dirty || data.error.length > 0);
        setIsBtnDisabled(buttonDisabled);
    }

    useEffect(() => {
        if (blogId) {
            if (state?.blog) {
                blogEditorDispatch({ type: "SET_BLOG_TO_EDIT", payload: { blogData: state.blog } })
            }
            else {
                BlogService.getPostById(parseInt(blogId))
                    .then(data => data.json())
                    .then(post => blogEditorDispatch({ type: "SET_BLOG_TO_EDIT", payload: { blogData: post } }))
                    .catch(console.log)
            }
        }
    }, [])

    useEffect(() => {
        isSubmitButtonDisabled();
    }, [editorState.blog]);

    return (
        <div className="p-3 " style={{ ...theme.secondary, minHeight: "calc(100vh - 56px)" }}>
            <Form className="p-3 mx-auto border border-success rounded mt-5" style={{ maxWidth: "55em", ...theme.primary }}>
                <Form.Group className="mb-2"
                    controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                        style={{ ...theme.input }}
                        name="title"
                        placeholder="Surge in corona cases"
                        value={title.value}
                        onChange={updateField}
                        isInvalid={title.error} />
                    <Form.Control.Feedback type='invalid'>
                        {title.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea"
                        rows={14}
                        style={{ ...theme.input }}
                        name="body"
                        value={body.value}
                        onChange={updateField}
                        isInvalid={body.error} />
                    <Form.Control.Feedback type='invalid'>
                        {body.error}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant='danger'
                        onClick={handleCancel}>Cancel</Button>
                    {state?.blog
                        ? <Button
                            disabled={!editorState.isDirty}
                            variant='success'
                            onClick={updatePost}>Update</Button>
                        : <Button disabled={isBtnDisabled}
                            variant='success'
                            onClick={createPost}>Create</Button>
                    }
                </div>
            </Form>
        </div>
    )
}

export default BlogEditor