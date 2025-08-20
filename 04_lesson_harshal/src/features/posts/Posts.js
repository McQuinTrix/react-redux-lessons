import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, getPostListError, getPostListStatus, selectAllPosts} from "./postsSlice";
import PostListItem from "./PostListItem";
import {useEffect} from "react";

const Posts = () => {
    const dispatch = useDispatch();
    const postList = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostListStatus);
    const postListError = useSelector(getPostListError);
    let content = '';

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    if (postStatus === 'loading') {
        content = `Loading`;
    } else if (postStatus === 'success') {
        const sortedList = postList.slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        content = sortedList.map((item) => {
            return <PostListItem key={item.id} post={item} />
        })

    } else if (postStatus === 'error') {
        content = {postListError}
    }


    return <section>
        Posts List
        {
            content
        }
    </section>
}

export default Posts;
