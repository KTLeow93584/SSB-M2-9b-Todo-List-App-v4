import './App.css';

import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import AuthCheck from './components/AuthCheck.jsx';

import { TodoContextComponent } from './contexts/TodoContext.jsx';
import { GetAuthContext, AuthContextComponent } from './contexts/AuthContext.jsx';
import { GetUserDBContext, UserDBContextComponent } from './contexts/UserDBContext.jsx';

import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';

import AddTodo from './pages/AddTodo.jsx';
import EditTodo from './pages/EditTodo.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function Layout() {
  // ================================
  const userDBContext = GetUserDBContext();
  const users = userDBContext.users;
  // ================================
  const authContext = GetAuthContext();
  const token = authContext ? authContext.token : null;

  const user = authContext.user;
  const setUser = authContext.setUser;
  const setToken = authContext.setToken;
  // ================================
  // Debug
  //console.log("[On Layout Render] Cached Token Found: ", hasCachedToken);
  //console.log("[On Layout Render] Active User: ", activeUser);
  //console.log("[On Layout Render] Token: ", cachedToken);
  // ================================
  // Check if user is null but token is cached -> Update user based on cached token.
  function fetchUserByToken(activeUser, activeToken) {
    if (!activeToken) {
      if (activeUser !== null)
        setUser(null);
      return;
    }

    if (activeUser === null || (activeUser !== null && activeUser.token !== activeToken)) {
      const cachedUserIndex = users.findIndex((user) => user.activeToken === activeToken);

      // Debug
      //console.log("[On Layout Render] Cached User Index: ", cachedUserIndex);

      if (cachedUserIndex !== -1 && activeUser === null)
        setUser(users[cachedUserIndex]);
    }
  }

  useEffect(() => fetchUserByToken(user, token));
  // ================================
  const navigate = useNavigate();
  // ================================
  const onLogoutCallback = () => {
    setUser(null);
    setToken(null);
    navigate('/');
  };
  // ================================
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Nav className="me-auto">
              {
                (user) ? (
                  <>
                    <Nav.Link href="/add">Add Todo</Nav.Link>
                    <Nav.Link onClick={onLogoutCallback}>Log Out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                  </>
                )
              }
            </Nav>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <UserDBContextComponent>
      <TodoContextComponent>
        <AuthContextComponent>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/add" element={
                  <AuthCheck>
                    <AddTodo />
                  </AuthCheck>
                } />
                <Route path="/todo/:id" element={
                  <AuthCheck>
                    <EditTodo />
                  </AuthCheck>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContextComponent>
      </TodoContextComponent>
    </UserDBContextComponent>
  );
}

export default App
