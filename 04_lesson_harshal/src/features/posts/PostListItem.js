import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";
import {Link} from "react-router-dom";

const PostListItem = ({ post }) => {
    return <article >
        <h3>{post.title}</h3>
        <p className="excerpt">
            {post.content.substring(0,75)}...
        </p>
        <p className='postCredit'>
            <Link to={`post/${post.id}`}> View Post </Link>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
            <PostReaction postId={post.id} postReactions={post.reactions} />
        </p>
    </article>
}

export default PostListItem;
