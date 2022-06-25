import React from 'react'

import "./MenuBar.css"

import { useSelector, useDispatch } from 'react-redux'

import { NavLink, Link, useNavigate, useLocation, useSearchParams, useMatch } from 'react-router-dom'

import { Navbar, Nav, Form, FormControl, InputGroup, Button, Image } from 'react-bootstrap'

import { set } from '../store/userDetailsSlice'

import logo from "../assets/images/logo.svg"

const MenuBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch('/authors/:authorId');
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();
    const { theme, userDetails } = useSelector(state => state)
    const { user } = userDetails;
    const showSearchInput = pathname === "/" || pathname === "/account/dashboard" || match

    const handleLogout = () => {
        dispatch(set({}))
        localStorage.removeItem('user')
        navigate('/auth/login')
    }

    const handleSearchInput = (e) => {
        const inputValue = e.target.value;
        searchParams.set("search", inputValue)
        setSearchParams(searchParams)
    }

    const handleSearchOptions = (e) => {
        const inputValue = e.target.value;
        searchParams.set("searchBy", inputValue)
        setSearchParams(searchParams)
    }

    return (
        <Navbar collapseOnSelect={true}
            expand="lg"
            className='py-2 px-1 justify-content-between'
            style={{
                ...theme.primary,
                height: "56px",
                zIndex: "2",
            }}>
            <Navbar.Brand className="mx-3 d-flex"
                as={Link} to="/"><Image style={{ height: "1.5em" }} src={logo} /></Navbar.Brand>
            {showSearchInput && <InputGroup className="w-25 self-align-center flex-grow-1 " style={{ maxWidth: "35em" }}>
                <FormControl placeholder="Search"
                    value={searchParams.get('search') ?? ""}
                    onChange={handleSearchInput} />
                <Form.Select style={{ width: "1%", maxWidth: "7em", fontSize: "0.8em" }}
                    value={searchParams.get('searchBy') ?? "title"}
                    onChange={handleSearchOptions}>
                    <option value="title">Title</option>
                    <option value="name" disabled={(match || pathname === "/account/dashboard") ? true : false}>Author</option>
                    <option value="date">Date</option>
                </Form.Select>
            </InputGroup>}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ ...theme.darkIcon }} />
            <Navbar.Collapse className="responsive-navbar-nav flex-grow-0" style={{ ...theme.primary }} >
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink}
                        eventKey="1"
                        className="mx-4"
                        to='/'>Home</Nav.Link>
                    {user?.details
                        && <>
                            <Nav.Link as={NavLink}
                                eventKey="2"
                                className="mx-4"
                                to="/account/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={NavLink}
                                eventKey="3"
                                className="mx-4"
                                to="/account/profile">Profile</Nav.Link>
                        </>}
                    <Nav.Link as={NavLink}
                        eventKey="4"
                        className="mx-4"
                        to="about-us">AboutUs</Nav.Link>
                    {!user?.details
                        ? <Button variant="outline-primary"
                            className="mx-4"
                            as={Link}
                            to='/auth/login'
                            style={{ width: "4.7em" }}>Sign In</Button>
                        : <Button variant="outline-primary"
                            onClick={handleLogout}
                            className="mx-4"
                            style={{ width: '4.7em' }}>Logout</Button>}
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default MenuBar