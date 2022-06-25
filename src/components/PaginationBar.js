import React, { useMemo } from 'react'

import { Button, Form } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux/es/exports';

import { incrementPage, decrementPage, updateMaxPostsPerPage } from '../store/paginationSlice';

const data = Array(5).fill(0).map((i, index) => (index + 1) * 5);

const PaginationBar = ({ totalPosts }) => {
    const { theme } = useSelector(state => state)
    const paginationState = useSelector(state => state.pagination);
    const { currentPage, maxPostsPerPage } = paginationState;
    const totalPages = useMemo(() => Math.ceil(totalPosts / maxPostsPerPage), [totalPosts])
    const dispatch = useDispatch();

    return (
        <div className="d-flex  p-2 mt-2 align-items-center justify-content-center"
            style={{ ...theme.primary, position: "fixed", bottom: "0", width: "100%" }}>
            <div className='d-flex position-absolute align-items-center'
                style={{ gap: "1em", left: "0.3em", }}>
                <span style={{ minWidth: "max-content" }} className="d-none d-md-inline"> Posts per page</span>
                <Form.Select aria-label="Default select example"
                    size='sm'
                    value={maxPostsPerPage}
                    onChange={(e) => dispatch(updateMaxPostsPerPage(Number(e.target.value)))}
                    style={{ maxWidth: "5em" }}>
                    {data.map(blogsPerPage => <option key={blogsPerPage} value={blogsPerPage}>{blogsPerPage}</option>)}
                </Form.Select>
            </div>
            <div style={{ fontSize: "clamp(12px,2.4vw,16px" }}>
                <Button className='mx-4'
                    style={{ fontSize: "inherit", margin: "0 1.2em" }}
                    variant='primary'
                    onClick={() => dispatch(decrementPage())}
                    disabled={currentPage === 1}>Prev</Button>
                Page {currentPage} of {totalPages}
                <Button className='mx-4'
                    style={{ fontSize: "inherit", margin: "0 1.2em" }}
                    variant='primary'
                    onClick={() => dispatch(incrementPage())}
                    disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div >
    )
}

export default PaginationBar