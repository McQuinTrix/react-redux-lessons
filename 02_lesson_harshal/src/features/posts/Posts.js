import {useSelector} from "react-redux";
import {selectAllPosts} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";

const Posts = () => {
    const postList = useSelector(selectAllPosts);

    const sortedList = postList.slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = sortedList.map((item) => {
        return <article key={item.id}>
            <h3>{item.title}</h3>
            <p>
                {item.content.substring(0,100)}
            </p>
            <p className='postCredit'>
                <PostAuthor userId={item.userId}/>
                <TimeAgo timestamp={item.date} />
                <PostReaction postId={item.id} postReactions={item.reactions} />
            </p>
        </article>
    })

    return <section>
        Posts List
        {
            renderedPosts
        }
    </section>
}

export default Posts;
