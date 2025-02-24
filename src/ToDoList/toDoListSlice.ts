
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
