import React, { useEffect, useState } from 'react'

import { Link, useSearchParams, useParams } from 'react-router-dom'

import { Button, Spinner } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import useDebounce from '../../hooks/useDebounce'

import BlogCard from '../../components/BlogCard';
import PaginationBar from '../../components/PaginationBar';
import FilterSort from '../../components/FilterSort'

import { resetPage } from '../../store/paginationSlice';

import BlogService from '../../services/BlogService';


const Dashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { authorId } = useParams();
    const debouncedSearchInput = useDebounce(searchParams.get('search'), 500) ?? ""
    const minLikesFilter = searchParams.get('minLikes')
    const searchOption = searchParams.get('searchBy') ?? "title";
    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order') ?? "asce"
    const paginationState = useSelector(state => state.pagination)
    const { currentPage, maxPostsPerPage } = paginationState;
    const dispatch = useDispatch();
    const { theme, userDetails } = useSelector(state => state)
    const { user } = userDetails;
    const [posts, setPosts] = useState({
        records: [],
        totalCount: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const showBlogs = () => {
        if (apiError) {
            return <div className="text-danger font-larger text-center">{apiError}</div>
        }
        else {
            if (posts.records.length) {
                return posts.records.map(post => <BlogCard key={post.id} blog={post} />)
            }
            else {
                return <div className="display-4 text-center">Create Your first blog</div>
            }
        }
    }

    useEffect(() => {
        let query = sortBy ? `&_sort=${sortBy === 'likes' ? 'likes.length' : sortBy}&_order=${order}` : "";
        query = query + (minLikesFilter ? `&likes.length_gte=${minLikesFilter}` : "")
        query = query + (debouncedSearchInput ? `&${searchOption}=${debouncedSearchInput}` : "");
        const id = authorId ?? user?.details?.id;

        setIsLoading(true);
        BlogService.getPostsByUserId(id, maxPostsPerPage, currentPage, query)
            .then(async (data) => {
                setPosts({
                    records: await data.json(),
                    totalCount: Number(data.headers.get('x-total-count'))
                })
            })
            .catch(error => setApiError(error.message || error))
            .finally(() => setIsLoading(false))
    }, [currentPage, maxPostsPerPage, searchOption, debouncedSearchInput, minLikesFilter, sortBy, order, authorId])

    useEffect(() => {
        dispatch(resetPage())
    }, [maxPostsPerPage])

    // useEffect(() => {
    //     console.log(currentPage, posts);
    // }, [posts])

    return (
        <div className="w-100 z-1" style={{ minHeight: "calc(100vh - 56px)", ...theme.secondary }}>
            <div className='sticky-top py-1 d-flex justify-content-between align-items-center' style={{ textAlign: "right", zIndex: "1", ...theme.secondary }}>
                <FilterSort />
                {!authorId && <Button variant='primary'
                    as={Link}
                    style={{ fontSize: "clamp(12px ,2.5vw, 16px)" }}
                    className='mx-3'
                    to='/account/editor'>Create Post +</Button>}
            </div>
            <div className=' pb-5 px-3'>
                {
                    isLoading
                        ? <div className="text-center"><Spinner animation="border" /></div>
                        : showBlogs()
                }
            </div>
            {posts.totalCount > maxPostsPerPage && <PaginationBar totalPosts={posts?.totalCount} />}
        </div>
    )
}

export default Dashboard