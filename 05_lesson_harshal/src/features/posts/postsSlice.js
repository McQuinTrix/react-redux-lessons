import { createAsyncThunk, createSlice, nanoid, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns/sub";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

function Reaction() {
    return {
        'lmao': 0,
        'heart': 0,
        'rofl': 0,
        'like': 0,
        'crying': 0,
    }
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get(POSTS_URL);
        return [...response.data];
    });

export const addPostV2 = createAsyncThunk(
    'posts/addPost', async (initialPost) => {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    })

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (updatedPost) => {
        const { id } = updatedPost;
        try {
            const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
            return response.data;
        } catch (e) {
            return e.message;
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id) => {
        try {
            const resp = await axios.delete(`${POSTS_URL}/${id}`);
            if (resp.status === 200) {
                return id;
            } else {
                return `${resp?.status}: ${resp?.statusText}`
            }
        } catch (e) {
            return e.message;
        }
    }
)

export const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null,
    count: 0,
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
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
            const currentPost = state.entities[postId];
            if (currentPost) {
                currentPost.reactions[reaction]++;
            }
        },
        incrementCount: (state) => {
            state.count += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (
                state
            ) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (
                state,
                action
            ) => {
                state.status = 'success';
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {
                        minutes: Math.random() * 10 + Math.random()*100
                    }).toISOString();
                    post.reactions = Reaction();
                    post.content = post.body;
                    return post;
                })
                debugger;
                //state.posts = state.posts.concat(loadedPosts);
                postsAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'fail';
                state.error = action.error.message;
            })
            .addCase(addPostV2.fulfilled, (state, action) => {
                postsAdapter.addOne(state, {
                    ...action.payload,
                    userId: Number(action.payload.userId),
                    date: new Date().toISOString(),
                    reactions: Reaction(),
                })
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload.id) {
                    return
                }
                postsAdapter.upsertOne(state, {
                    ...action.payload,
                    date: new Date().toISOString(),
                })
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload) {
                    console.log('deletion not complete');
                    return
                }
                postsAdapter.removeOne(state, action.payload.id);
            })
    }
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.posts);
export const getPostListStatus = (state) => state.posts.status;
export const getPostListError = (state) => state.posts.error;

export const getCount = (state) => state.posts.count;
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId),
)

export const {
    updatePostReaction,
    incrementCount,
} = postsSlice.actions;

export default postsSlice.reducer;
