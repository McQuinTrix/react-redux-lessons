import { useSelector} from "react-redux";
import { getPostListError, getPostListStatus, selectAllPosts} from "./postsSlice";
import PostListItem from "./PostListItem";

const Posts = () => {
    const postList = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostListStatus);
    const postListError = useSelector(getPostListError);
    let content = '';

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
        {
            content
        }
    </section>
}

export default Posts;
