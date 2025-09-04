import { useSelector} from "react-redux";
import { getPostListError, getPostListStatus, selectPostIds } from "./postsSlice";
import PostListItem from "./PostListItem";

const Posts = () => {
    const postIdList = useSelector(selectPostIds);
    const postStatus = useSelector(getPostListStatus);
    const postListError = useSelector(getPostListError);
    let content = '';

    if (postStatus === 'loading') {
        content = `Loading`;
    } else if (postStatus === 'success') {
        content = postIdList.map((item) => {
            return <PostListItem key={item} postId={item} />
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
