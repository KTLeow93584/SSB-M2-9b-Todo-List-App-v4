import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { GetUserDBContext } from '../contexts/UserDBContext.jsx';

export default function Login() {
    // ================================
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [doesUserExist, setDoesUserExist] = useState(false);
    const displayType = doesUserExist ? "d-block" : "d-none";
    // ================================
    const userDBContext = GetUserDBContext();
    const users = userDBContext.users;
    const setUsers = userDBContext.setUsers;
    // ================================
    const navigate = useNavigate();
    // ================================
    function registerUser(userEmail, userPassword) {
        const activeUserIndex = users.findIndex((user) => user.email === userEmail && user.password === userPassword);
        if (activeUserIndex !== -1) {
            setDoesUserExist(true);
            return;
        }

        const newUser = {
            id: users.length + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        // Debug
        //console.log("[On Successful Registration] New User: ", newUser);

        setUsers((previousUsers) => [...previousUsers, newUser]);

        navigate('/login');
    }

    return (
        <>
            <Container fluid className="d-flex justify-content-center mt-5">
                <Container fluid className="mx-5">
                    <Form onSubmit={(event) => {
                        event.preventDefault();
                        registerUser(email, password);
                    }}>
                        {/* -------------------------------- */}
                        {/* First Name */}
                        <Form.Group className="mb-3" controlId="form-first-name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                placeholder="Enter your first name"
                                onChange={((e) => setFirstName(e.target.value))}
                                required />
                        </Form.Group>
                        {/* -------------------------------- */}
                        {/* Last Name */}
                        <Form.Group className="mb-3" controlId="form-last-name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                placeholder="Enter your last name"
                                onChange={((e) => setLastName(e.target.value))}
                                required />
                        </Form.Group>
                        {/* -------------------------------- */}
                        {/* Email */}
                        <Form.Group className="mb-3" controlId="form-email">
                            <Form.Label>Email Address</Form.Label>
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
                        {/* -------------------------------- */}
                        {/* Password */}
                        <Form.Group className="mb-3" controlId="form-password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={((e) => setPassword(e.target.value))}
                                required />
                        </Form.Group>
                        {/* -------------------------------- */}
                        {/* Error Message Display */}
                        <Form.Group className={`mb-3 ${displayType}`} controlId="error-msg">
                            <Form.Text className="text-danger">
                                There is already an account with the email [{email}].
                            </Form.Text>
                        </Form.Group>
                        {/* -------------------------------- */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        {/* -------------------------------- */}
                    </Form>
                </Container>
            </Container>
        </>
    );
}