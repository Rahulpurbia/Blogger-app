import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Spinner } from 'react-bootstrap'

import UserCard from '../components/UserCard'
import BlogCard from '../components/BlogCard'
import PaginationBar from '../components/PaginationBar'
import FilterSort from '../components/FilterSort'

import useDebounce from '../hooks/useDebounce'


import BlogService from '../services/BlogService'

import useBlogReducer from '../reducers/BlogReducer'

import { resetPage } from '../store/paginationSlice'

const Blogs = () => {
    const paginationState = useSelector(state => state.pagination);
    const { currentPage, maxPostsPerPage } = paginationState;
    const dispatch = useDispatch();
    const [state, blogDispatch] = useBlogReducer();
    const [searchParams, setSearchParams] = useSearchParams();
    const { theme } = useSelector(state => state)
    const { blogs, dataLoading, apiError, users } = state;
    const minLikesFilterValue = searchParams.get('minLikes')
    const debouncedSearchInput = useDebounce(searchParams.get('search'), 500) ?? ""
    const searchOption = searchParams.get('searchBy') ?? "title";
    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order') ?? 'asce'

    const setResults = (response) => {
        return {
            type: `${(debouncedSearchInput && searchOption === 'name') ? "SET_USERS" : "SET_BLOGS"}`,
            payload: {
                records: response?.data,
                totalCount: response?.totalCount
            }
        }
    }

    const showResults = () => {
        if (apiError) {
            return <div className="text-danger font-larger text-center">{apiError}</div>
        }
        else {
            if (debouncedSearchInput && searchOption === 'name' && users?.records?.length) {
                return users.records.map(user => <UserCard key={user.id} user={user} />)
            }
            else if (blogs?.records?.length) {
                return blogs.records.map(blog => <BlogCard key={blog.id} blog={blog} />)
            }
            else {
                return <div className="display-4 text-center">No results found</div>
            }
        }
    }

    useEffect(() => {
        let query = sortBy ? `&_sort=${sortBy === 'likes' ? 'likes.length' : sortBy}&_order=${order}` : "";
        query = query + (minLikesFilterValue ? `&likes.length_gte=${minLikesFilterValue}` : "")
        query = query + (debouncedSearchInput ? `&${searchOption}=${debouncedSearchInput}` : "");

        const getApi = () => {
            if (debouncedSearchInput && searchOption === "name") {
                return BlogService.getPostsByAuthorName(maxPostsPerPage, currentPage, query);
            }
            else {
                return BlogService.getPosts(maxPostsPerPage, currentPage, query)
            }
        }

        blogDispatch({ type: "PREPARE_FETCH" })
        getApi()
            .then(async (data) => {
                blogDispatch(setResults({
                    data: await data.json(),
                    totalCount: Number(data.headers.get('x-total-count'))
                }))
            })
            .catch((error) => blogDispatch({ type: "SET_API_ERROR", payload: error.mesage || error }))
            .finally(() => blogDispatch({ type: "SET_LOADING", payload: false }))
    }, [currentPage, debouncedSearchInput, maxPostsPerPage, searchOption, minLikesFilterValue, sortBy, order])

    useEffect(() => {
        dispatch(resetPage())
    }, [debouncedSearchInput])

    return (
        <div className={`d-flex flex-column position-relative`}
            style={{ minHeight: "calc(100vh - 56px)", zIndex: "1", ...theme.secondary }} >
            <FilterSort placeholder="Search by author,topic or date (dd/mm/yyyy)" />
            <div className=' pb-5 px-3 mx-auto w-100 '>
                {
                    dataLoading
                        ? <div className='text-center'><Spinner className="" animation="border" /></div>
                        : showResults()
                }
            </div>
            {blogs.totalCount > maxPostsPerPage && <PaginationBar totalPosts={blogs?.totalCount} />}
        </div >
    )
}

export default Blogs