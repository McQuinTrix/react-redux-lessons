import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// Loaded in index.js
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const usersResponse = await axios.get(USERS_URL);
        return usersResponse.data;
    })

const initialState = [

]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // completely updating the state;
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;
