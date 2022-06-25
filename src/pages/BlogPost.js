import React, { useEffect, useState } from 'react'

import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { Spinner, Card, Button, Image } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'

import BlogService from '../services/BlogService';

import useBlogPostReducer from '../reducers/BlogPostReducer';

import { show } from '../store/toastSlice';

import likeButton from "../assets/images/like.svg"

const BlogPost = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { blogId } = useParams();
    const [blogPostState, blogPostDispatch] = useBlogPostReducer();
    const { blog, dataLoading, apiError } = blogPostState;
    const { userId, id, title, body, date, likes, user: author } = blog;
    const { theme, userDetails } = useSelector(state => state)
    const { user } = userDetails;
    const navigate = useNavigate();
    const [didLikedPost, setDidLikedPost] = useState(false);

    const removePost = () => {
        BlogService.posts.delete(id)
            .then(data => {
                data.ok
                    ? dispatch(show({ type: 'success', title: "Deleted", message: "Successfully deleted post" }))
                    : dispatch(show({ type: 'danger', title: "Error", message: 'Unable to delete the post,try again later' }))
                navigate('/account/dashboard')
            })
    }

    const toggleLike = () => {
        let updatedLikes;
        if (didLikedPost) {
            let index = likes.indexOf(user?.details?.id);
            likes.splice(index, 1);
            updatedLikes = { likes }
        }
        else {
            likes.push(user?.details?.id)
            updatedLikes = { likes }
        }
        BlogService.updateLike(blogId, updatedLikes)
            .then(data => data.ok && setDidLikedPost(!didLikedPost))
            .catch(err => console.log(err.message))
    }

    const showBlogPost = () => {
        if (apiError) {
            return <div className='text-danger text-center'>{apiError}</div>
        }
        else {
            if (Object.keys(blog).length === 0) {
                return <div className='display-4 text-center'>Blog Not Found</div>
            }
            else {
                return <Card style={{ maxWidth: '55em', height: "max-content", ...theme.primary }} className='p-3 position-relative'>
                    <div className="d-flex justify-content-between mx-2 mt-2" style={{ fontSize: "13px", gap: "0.5em" }}>
                        <div>Published On: {date}</div>
                        <div>
                            <div>Author: {author?.name}</div>
                            <div>Email: <a style={{ color: "green" }} href={` mailto:${user?.details?.email}`}>{author?.email}</a></div>
                        </div>
                    </div>
                    <Card.Body>
                        <Card.Title className='mb-5'>{title}</Card.Title>
                        <Card.Text> {body}</Card.Text>
                        <div className='d-flex justify-content-between mt-4'>
                            <a style={{ bottom: "3px", left: "3px", cursor: "pointer", gap: "0.3em" }}
                                className='d-flex align-items-center'
                                onClick={toggleLike}>
                                <Image src={likeButton} style={{ height: "1.5em", filter: `${didLikedPost ? "none" : "grayscale(100%)"}` }} /> {likes?.length}</a>
                            {userId === user?.details?.id
                                && <div className='d-flex' style={{ gap: "0.5em" }}>
                                    <Button size="sm"
                                        variant='danger'
                                        onClick={removePost}>Delete</Button>
                                    <Button size='sm'
                                        onClick={() => navigate(`/account/editor/${blogId}`, { state: { blog } })}>Edit</Button>
                                </div>
                            }
                        </div>
                    </Card.Body>
                </Card>
            }
        }
    }

    useEffect(() => {
        if (state?.blog) {
            blogPostDispatch({ type: 'SET_BLOG', payload: state.blog })
        }
        else {
            blogPostDispatch({ type: 'RESET_ERROR' })
            BlogService.getPostById(parseInt(blogId))
                .then(data => data.json())
                .then(post => blogPostDispatch({ type: 'SET_BLOG', payload: post }))
                .catch(error => blogPostDispatch({ type: 'SET_API_ERROR', payload: error.message || error }))
                .finally(() => blogPostDispatch({ type: 'SET_LOADING', payload: false }))
        }
    }, [blogId])

    useEffect(() => {
        if (likes && likes.includes(user?.details?.id)) {
            setDidLikedPost(true)
        }
    }, [likes])

    return (
        <div className=' d-flex justify-content-center py-5 px-3' style={{ minHeight: "calc(100vh - 56px", ...theme.secondary }}>
            {dataLoading
                ? <Spinner animation="border" />
                : showBlogPost()}
        </div >
    )
}

export default BlogPost