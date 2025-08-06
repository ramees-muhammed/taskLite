import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/instance";



export const createTask = createAsyncThunk(
    "tasks/create",
    async (taskData, { rejectWithValue }) => {
        try {
            const { data } = await instance.post("/tasks/", taskData);
            return data;
        } catch (error) {
            return rejectWithValue({ message: error?.response?.data?.message || error?.message });
        }
    }
);

export const fetchTasks = createAsyncThunk(
    "tasks/fetch",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const searchParams = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    searchParams.append(key, value);
                }
            });

            const { data } = await instance.get(`/tasks/?${searchParams.toString()}`);
            return data;
        } catch (error) {
            return rejectWithValue({ message: error?.response?.data?.message || error?.message });
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const { data } = await instance.put(`/tasks/${id}`, updateData);
            return data;
        } catch (error) {
            return rejectWithValue({ message: error?.response?.data?.message || error?.message });
        }
    }
)

export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await instance.delete(`/tasks/${id}`,);
            return data;
        } catch (error) {
            return rejectWithValue({ message: error?.response?.data?.message || error?.message });
        }
    }
)