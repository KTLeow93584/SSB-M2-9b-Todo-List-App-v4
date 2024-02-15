import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GetAuthContext } from '../contexts/AuthContext.jsx';
import { GetTodoContext } from '../contexts/TodoContext.jsx';

export default function EditTodo() {
    const setTodos = GetTodoContext().setTodos;
    const todos = GetTodoContext().todos;

    const navigate = useNavigate();

    const authContext = GetAuthContext();
    const user = authContext.user;

    const taskID = parseInt(useParams().id);
    const currentTodo = todos.filter((todo) => todo.id === taskID)[0];

    const [title, setTitle] = useState(currentTodo.title);
    const [description, setDescription] = useState(currentTodo.description);
    const [completed, setCompleted] = useState(currentTodo.completed);

    function updateTodo(event) {
        event.preventDefault();

        const updatedTodos = todos.map((todo) => {
            if (todo.id === taskID)
                return { userID: user.id, id: taskID, title, description, completed };
            return todo;
        });

        // Debug
        //console.log("[On Modify Existing TODO] Object.", updatedTodos);

        setTodos(updatedTodos);
        navigate('/');
    }

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form onSubmit={updateTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Insert todo title here."
                        required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Insert todo description here."
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