import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {addTask, deleteTask, fetchTasks, updateTaskStatus} from "./toDoListThunk.ts";
import React, {useEffect, useState} from "react";
import {Task} from "./toDoListSlice.ts";

const ToDoList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {tasks} = useSelector((state: RootState) => state.toDoList);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            dispatch(addTask(newTaskTitle));
            setNewTaskTitle("");
        }
    };

    const handleToggleStatus = (task: Task) => {
        dispatch(updateTaskStatus(task));
    };

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };


    return (
        <div className="container">
            <h1>To Do List</h1>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div>
                            <input type="checkbox"
                                   checked={task.status}
                                   onChange={() => handleToggleStatus(task)}/>
                            <span className={task.status ? "completed" : ""}>{task.title}</span>
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;