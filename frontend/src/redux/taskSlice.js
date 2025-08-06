import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, fetchTasks, updateTask } from "./taskThunks";
import { handlePending, handleRejected } from "../utils/reduxHelpers";




const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //createTask Thunk
            .addCase(createTask.pending, handlePending)
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks.push(action.payload.task);
            })
            .addCase(createTask.rejected, handleRejected)

            //getAllTask Thunk
            .addCase(fetchTasks.pending, handlePending)
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks = action.payload.tasks;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
            })
            .addCase(fetchTasks.rejected, handleRejected)

            //updateTask
            .addCase(updateTask.pending, handlePending)
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const updatedTask = action.payload.task;
                const index = state.tasks.findIndex((tk) => tk._id === updatedTask._id);

                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
            })
            .addCase(updateTask.rejected, handleRejected)

            //deleteTask
            .addCase(deleteTask.pending, handlePending)
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const deletedTaskId = state.tasks.findIndex((tk) => tk._id === action.payload.task._id);

                if (deleteTask !== -1) {
                    state.tasks.splice(deletedTaskId, 1);
                }
            })
            .addCase(deleteTask.rejected, handleRejected)
    }
});

export default taskSlice.reducer;