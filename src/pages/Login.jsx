import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { GetAuthContext } from '../contexts/AuthContext.jsx';

import { GetUserDBContext } from '../contexts/UserDBContext.jsx';

export default function Login() {
    // ================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidUser, setValidUser] = useState(true);
    const displayType = isValidUser ? "d-none" : "d-block";
    // ================================
    const authContext = GetAuthContext();
    const setUser = authContext.setUser;
    const setToken = authContext.setToken;
    // ================================
    const userDBContext = GetUserDBContext();
    const users = userDBContext.users;
    const setUsers = userDBContext.setUsers;
    // ================================
    const navigate = useNavigate();
    // ================================
    function validateAuth(userEmail, userPassword) {
        const activeUserIndex = users.findIndex((user) => user.email === userEmail && user.password === userPassword);
        if (activeUserIndex === -1) {
            setValidUser(false);
            return;
        }

        // Debug
        console.log("[On Successful Login] Active User: ", users[activeUserIndex]);
        console.log("[On Successful Login] User DB: ", users);

        const newToken = "abc123";
        setUsers((previousUsers) => {
            const newUsers = previousUsers;
            newUsers[activeUserIndex].activeToken = newToken;

            // Debug
            console.log("[On Successful Login] Changing User: ", newUsers);

            return [...newUsers];
        });

        // Back-end not taught as of this lesson. Thus, hard-code tokens for now.
        setToken(newToken);
        setUser(users[activeUserIndex]);

        // Debug
        console.log("[On Successful Login] Set Active User: ", users[activeUserIndex]);

        navigate('/');
    }

    return (
        <>
            <Container fluid className="d-flex justify-content-center mt-5">
                <Container fluid className="mx-5">
                    <Form onSubmit={(event) => {
                        event.preventDefault();
                        validateAuth(email, password);
                    }}>
                        <Form.Group className="mb-3" controlId="form-email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={((e) => setEmail(e.target.value))}
                                required />
                            <Form.Text className="text-muted">
                                We&apos;ll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={((e) => setPassword(e.target.value))}
                                required />
                        </Form.Group>

                        <Form.Group className={`mb-3 ${displayType}`} controlId="error-msg">
                            <Form.Text className="text-danger">
                                Incorrect email/password combination.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    );
}