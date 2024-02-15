import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { GetAuthContext } from '../contexts/AuthContext';
import { GetTodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const todoContext = GetTodoContext();
    const todos = todoContext.todos;
    const setTodos = todoContext.setTodos;

    const authContext = GetAuthContext();
    const user = authContext.user;

    const navigate = useNavigate();

    function addTodo(event) {
        event.preventDefault();

        const newTodo = { userID: user.id, id: Date.now(), title, description, completed };

        // Debug
        //console.log("[On Add New TODO] Object.", newTodo);

        setTodos([...todos, newTodo]);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form onSubmit={addTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Insert todo title here"
                        required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Insert todo description here"
                        required />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3" />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}