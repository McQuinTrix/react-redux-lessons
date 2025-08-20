import {useDispatch} from "react-redux";
import {updatePostReaction} from "./postsSlice";

const reactions = {
    'lmao': '😂',
    'heart': '❤️',
    'rofl': '🤣',
    'like': '👍',
    'crying': '😭',
}

const PostReaction = ({ postReactions, postId }) => {
    const dispatch = useDispatch();

    const onReactionClick = (reactionName) => {
        debugger
        dispatch(
            updatePostReaction({
                postId,
                reaction: reactionName,
            })
        )
    }

    const reactionsHtml = Object.entries(reactions).map(([name, emoji]) => {
        return <span key={name} onClick={() => onReactionClick(name)}>
            {emoji}: {postReactions[name]}
        </span>
    })

    return <div>
        {reactionsHtml}
    </div>
}

export default PostReaction;
