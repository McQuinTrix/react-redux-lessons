// add imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice.js";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            userId: 1,
            title: newTodo,
            completed: false,
        })
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>


    let content;
    if (isLoading) {
        content = 'Loading ...';
    } else if(isSuccess) {
        content = todos.map((item) => (
            <article key={item.id}>
                <div className='todo'>
                    <input
                        type="checkbox"
                        checked={item.completed}
                        id={item.id}
                        onChange={() => updateTodo({...item, completed: !item.completed})}
                    />
                    <label htmlFor={item.id}>{item.title}</label>
                </div>
                <button className='trash' onClick={() => deleteTodo({ id: item.id })}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        ))
    } else if (isError) {
        content = error;
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList