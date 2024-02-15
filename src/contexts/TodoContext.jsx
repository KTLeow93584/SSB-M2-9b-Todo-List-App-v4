import { useState, createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

const TodoContext = createContext([]);
export function GetTodoContext() {
    return useContext(TodoContext);
}

export function TodoContextComponent({ children }) {
    const [todoList, setTodoList] = useLocalStorage("todos", []);
    const [showDeleteTodoModal, setShowDeleteTodoModal] = useState({ visible: false, todoID: null });

    return (
        <TodoContext.Provider value={{
            todos: todoList,
            setTodos: setTodoList,
            showDeleteTodoModal: showDeleteTodoModal,
            setShowDeleteTodoModal: setShowDeleteTodoModal
        }}>
            {children}
        </TodoContext.Provider>
    );
}