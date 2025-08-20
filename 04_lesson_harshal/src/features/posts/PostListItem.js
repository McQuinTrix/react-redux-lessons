import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";

const PostListItem = ({ post }) => {
    return <article >
        <h3>{post.title}</h3>
        <p>
            {post.content.substring(0,100)}
        </p>
        <p className='postCredit'>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
            <PostReaction postId={post.id} postReactions={post.reactions} />
        </p>
    </article>
}

export default PostListItem;
