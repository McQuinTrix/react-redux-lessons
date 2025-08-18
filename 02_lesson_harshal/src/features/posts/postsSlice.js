import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns/sub";

function Reaction() {
    return {
        'lmao': 0,
        'heart': 0,
        'rofl': 0,
        'like': 0,
        'crying': 0,
    }
}

const initialState = [
    {
        id: 1,
        title: 'Hello world',
        content: "Ive heard good things about the react redux toolkit",
        date: sub(new Date(), { minutes: 40 }).toISOString(),
        reactions: Reaction(),
    },
    {
        id: 2,
        title: 'Tupper world',
        content: "Ive heard good things about the Tupper toolkit",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: Reaction(),
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: Reaction(),
                    }
                }
            }
        },
        updatePostReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const currentPost = state.find(i => i.id === postId);
            currentPost.reactions[reaction]++;
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const {
    addPost,
    updatePostReaction,
} = postsSlice.actions;

export default postsSlice.reducer;
