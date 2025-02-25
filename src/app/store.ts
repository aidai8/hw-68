import {configureStore} from '@reduxjs/toolkit';
import toDoListReducer from "../ToDoList/toDoListSlice.ts";

export const store = configureStore({
    reducer: {
        toDoList: toDoListReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;