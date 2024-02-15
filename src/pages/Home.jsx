import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { GetAuthContext } from '../contexts/AuthContext.jsx';
import { GetTodoContext } from '../contexts/TodoContext.jsx';

import TodoCard from '../components/TodoCard.jsx';

function CardGroup({ user, todos }) {
    return todos.map((todo) => {
        if (todo.userID !== user.id)
            return null;

        return (
            <Col md={4} key={todo.id}>
                <TodoCard todo={todo} />
            </Col>
        );
    });
}

export default function Home() {
    const todos = GetTodoContext().todos;
    const setTodos = GetTodoContext().setTodos;

    const showDeleteTodoModal = GetTodoContext().showDeleteTodoModal;
    const setShowDeleteTodoModal = GetTodoContext().setShowDeleteTodoModal;

    const handleClose = () => setShowDeleteTodoModal({ visible: false, todoID: showDeleteTodoModal.todoID });
    const deleteTodo = (currentTodoID) => setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== currentTodoID));

    const authContext = GetAuthContext();
    const activeUser = authContext.user;

    return (
        <Container fluid className="d-flex justify-content-center">
            <Container fluid className="mx-5">
                <h1 className="my-3">Your todos</h1>
                {
                    activeUser ? (
                        <Row>
                            <CardGroup user={activeUser} todos={todos} />
                        </Row>
                    ) :
                        (
                            <p>Hello visitor, please login to access your tasks!</p>
                        )
                }

                <Modal show={showDeleteTodoModal.visible}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirm TODO Task&apos;s deletion?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            deleteTodo(showDeleteTodoModal.todoID);
                            handleClose();
                        }}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    );
}