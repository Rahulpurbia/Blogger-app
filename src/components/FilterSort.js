import React, { useState } from 'react'

import "./FilterSort.css"

import { Form, Modal, Image } from 'react-bootstrap'

import { useSelector } from 'react-redux'

import { useSearchParams } from 'react-router-dom'

import filterSvg from "../assets/images/filter.svg"
import sortSvg from "../assets/images/sort.svg"

const priceFilterOptionsArray = Array(5).fill(0).map((i, index) => (index) * 50);

const FilterSort = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { theme } = useSelector(state => state)
    const minLikeFilterValue = searchParams.get('minLikes') ?? 0

    const openFilterModal = (breakpoint) => {
        setFullscreen(breakpoint);
        setIsFilterModalOpen(true);
    }

    const openSortModal = (breakpoint) => {
        setFullscreen(breakpoint);
        setIsSortModalOpen(true);
    }

    const setSortValue = (e) => {
        const inputValue = e.target.value;
        searchParams.set("sort", inputValue)
        setSearchParams(searchParams)
    }

    const setSortOrder = (e) => {
        const inputValue = e.target.value;
        searchParams.set('order', inputValue)
        setSearchParams(searchParams)
    }

    const updateLikeFilterValue = (e) => {
        const inputValue = e.target.value;
        searchParams.set("minLikes", inputValue)
        setSearchParams(searchParams)
    }

    return (<div className="search-bar d-flex me-0 pe-0 px-3 flex-md-responsive sticky-top justify-content-between align-items-center" style={{ ...theme.secondary }}>
        <div className='d-flex justify-content-end' style={{ gap: "1em", fontSize: "clamp(14px, 2.4vw,16px)" }}>
            <div className='text-center'>
                <Image src={filterSvg}
                    onClick={() => openFilterModal('md-down')}
                    style={{ height: "1.5em", cursor: "pointer", ...theme.darkIcon }} />
                <div>Filter</div>
            </div>
            <Modal show={isFilterModalOpen}
                fullscreen={fullscreen}
                onHide={() => setIsFilterModalOpen(false)}
                centered>
                <Modal.Header closeButton >
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Min Likes : {minLikeFilterValue}</Form.Label>
                        <Form.Select style={{ width: "20%", maxWidth: "7em", fontSize: "0.8em" }}
                            value={minLikeFilterValue}
                            onChange={updateLikeFilterValue} >
                            {priceFilterOptionsArray.map(value => <option key={value} value={value}>{value}</option>)}
                        </Form.Select>
                    </Form.Group>

                </Modal.Body>
            </Modal>
            <div className='text-center'>
                <Image src={sortSvg}
                    style={{ cursor: "pointer", height: "1.5em", ...theme.darkIcon }}
                    onClick={() => openSortModal('md-down')} />
                <div>Sort</div>
            </div>
            <Modal show={isSortModalOpen}
                fullscreen={fullscreen}
                onHide={() => setIsSortModalOpen(false)}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sort By</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between">
                    <Form.Select size='sm' style={{ width: "30%", maxWidth: "9em", fontSize: "0.8em", maxHeight: "2.5em" }}
                        value={searchParams.get('sort') || ""}
                        onChange={setSortValue}>
                        <option value="">None</option>
                        <option value="likes">Likes</option>
                        <option value="name">Author</option>
                    </Form.Select>
                    <Form.Group>
                        <Form.Check
                            type={'radio'}
                            name='order'
                            value='asce'
                            checked={searchParams.get('order') === 'asce'}
                            onChange={setSortOrder}
                            label={`Ascending`}
                        />
                        <Form.Check
                            type={'radio'}
                            name='order'
                            value='desc'
                            checked={searchParams.get('order') === 'desc'}
                            onChange={setSortOrder}
                            label={`Descending`}
                        />
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </div>
    </div >
    )
}

export default FilterSort