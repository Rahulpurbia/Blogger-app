import { useEffect } from 'react';

import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux/es/exports';

import MenuBar from './components/MenuBar';
import ToastContainer from './components/ToastContainer';
import ToggleThemeButton from './components/ToggleThemeButton';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import Blogs from './pages/Blogs';
import AboutUs from './pages/AboutUs';
import BlogPost from './pages/BlogPost';

import PageNotFound from './pages/PageNotFound';

import Profile from './pages/account/Profile/';
import Dashboard from './pages/account/Dashboard';
import BlogEditor from './pages/account/BlogEditor';

function App() {
  const { user } = useSelector(state => state.userDetails)

  useEffect(() => {
    if (user?.details) {
      const { id, name, username, email } = user.details;
      localStorage.setItem("user", JSON.stringify({ details: { id, name, username, email } }))
    }
  }, [user])

  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path=':blogId' element={<BlogPost />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="authors/:authorId" element={<Dashboard />} />
        <Route path='auth'>
          <Route index element={user?.details ? <Navigate to='/' /> : <Login />} />
          <Route path='login' element={user?.details ? <Navigate to='/' /> : <Login />} />
          <Route path='signup' element={user?.details ? <Navigate to='/' /> : <SignUp />} />
        </Route>
        <Route path='account'>
          <Route index element={user?.details ? <Dashboard /> : <Navigate to="/auth/login" />} />
          <Route path='dashboard' element={user?.details ? <Dashboard /> : <Navigate to="/auth/login" />} />
          <Route path='profile' element={user?.details ? <Profile /> : <Navigate to="/auth/login" />} />
          <Route path='editor' element={user?.details ? <BlogEditor /> : <Navigate to="/auth/login" />} />
          <Route path='editor/:blogId' element={user?.details ? <BlogEditor /> : <Navigate to="/auth/login" />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
      <ToggleThemeButton />
    </BrowserRouter>
  );
}

export default App;
