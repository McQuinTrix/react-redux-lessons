import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostListItem = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));

    return <article >
        <h2>{post.title}</h2>
        <p className="excerpt">
            {post.content.substring(0,75)}...
        </p>
        <section className='postCredit'>
            <Link to={`post/${post.id}`}> View Post </Link>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
            <PostReaction postId={post.id} postReactions={post.reactions} />
        </section>
    </article>
}

export default PostListItem;
