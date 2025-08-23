import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";
import {Link, useParams} from "react-router-dom";

const SinglePost = () => {

    const { postId } = useParams();
    debugger

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className='postCredit'>
                <Link to={`/post/edit/${postId}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date}></TimeAgo>
            </p>
            <PostReaction postId={post.id} postReactions={post.reactions} />
        </article>
    )
}

export default SinglePost;
