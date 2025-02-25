import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import {Task} from "./toDoListSlice.ts";

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async () => {
    const response = await axiosAPI.get("/tasks.json");
    const data = response.data;
    return Object.keys(data || {}).map((key) => ({ id: key, ...data[key] }));
});

export const addTask = createAsyncThunk<Task, string>("tasks/addTask", async (title) => {
    const newTask = { title, status: false };
    const response = await axiosAPI.post("/tasks.json", newTask);
    return { id: response.data.name, ...newTask };
});

export const updateTaskStatus = createAsyncThunk<Task, Task>(
    "tasks/updateTaskStatus",
    async (task) => {
        await axiosAPI.patch(`/tasks/${task.id}.json`, { status: !task.status });
        return { ...task, status: !task.status };
    }
);

export const deleteTask = createAsyncThunk<string, string>("tasks/deleteTask", async (id) => {
    await axiosAPI.delete(`/tasks/${id}.json`);
    return id;
});