import { useEffect, useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { GetTodoContext } from '../contexts/TodoContext';

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";

    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const setShowDeleteTodoModal = GetTodoContext().setShowDeleteTodoModal;
    const handleShow = () => setShowDeleteTodoModal({ visible: true, todoID: todo.id });

    let isPausedRef = useRef(false);

    let timeStartedRef = useRef(Date.now());
    let timeOffsetRef = useRef(0);

    const startTimer = () => {
        if (!timerInterval) {
            timeStartedRef.current = Date.now();

            // Debug
            //console.log("[Init - Started At] Time (Since Unix): " + timeStartedRef.current);

            const intervalID = setInterval(() => {
                if (isPausedRef.current)
                    return;

                // Current Time - Time Started = Total Duration.
                // Total Duration - (Resumed Time  - Paused Time) = Remaining Duration when it was in "played" state.
                timeOffsetRef.current += Date.now() - timeStartedRef.current;
                setTimer(Math.round(timeOffsetRef.current / 1000));

                // Debug
                //console.log("[Timer Update] Time Offset, Now - Start (Since Unix): " + timeOffsetRef.current);
                //console.log("[Timer Update] Time Started: " + timeStartedRef.current);
                //console.log("[Timer Update] Time Now: " + Date.now());

                timeStartedRef.current = Date.now();
            }, 100)

            setTimerInterval(intervalID);
        }
        else {
            timeStartedRef.current = Date.now();
            isPausedRef.current = false;
        }
    };

    const pauseTimer = () => {
        if (!isPausedRef.current) {
            isPausedRef.current = true;

            timeOffsetRef.current += Date.now() - timeStartedRef.current;

            // Debug
            //console.log("[Timer Paused] Time Offset, Now - Start (Since Unix): " + timeOffsetRef.current);
        }

        // No longer remove timer on delete.
        //clearInterval(timerInterval);
        //setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);

        isPausedRef.current = false;
        timeOffsetRef.current = 0;
        setTimer(0);
    };

    useEffect(() => {
        return (() => {
            clearInterval(timerInterval);
        });
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not "}Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={handleShow} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}