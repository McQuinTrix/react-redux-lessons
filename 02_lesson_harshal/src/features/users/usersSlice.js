import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    { id: "2", name: 'Fahad Singh' },
    { id: "3", name: 'Kishori Lal Chhada'},
    { id: "4", name: 'Murugesh Patel'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
