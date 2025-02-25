import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTask, deleteTask, fetchTasks, updateTaskStatus} from "./toDoListThunk.ts";

export interface Task {
    id: string;
    title: string;
    status: boolean;
}

interface ToDoListState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const initialState: ToDoListState = {
    tasks: [],
    loading: false,
    error: null,
};


export const toDoListSlice = createSlice({
    name: "toDoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching tasks";
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    },
});

export default toDoListSlice.reducer;