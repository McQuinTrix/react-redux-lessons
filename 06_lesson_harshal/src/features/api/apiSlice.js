import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Todos'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500'
    }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (res) => {
                console.log(res);
                return res.sort((a, b) => String(a.id).localeCompare(String(b.id)));
            },
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (todo) => {
                return {
                    url: `/todos`,
                    method: 'POST',
                    body: todo,
                }
            },
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: (body) => {
                return {
                    url: `/todos/${body.id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                //body: id
            }),
            invalidatesTags: ['Todos'],
        })
    })
});

console.log(apiSlice);

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;