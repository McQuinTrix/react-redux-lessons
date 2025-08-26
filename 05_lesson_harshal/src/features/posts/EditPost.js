import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, selectPostById, updatePost} from "./postsSlice";
import {useState} from "react";
import {selectAllUsers} from "../users/usersSlice";

const EditPost = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [user, setUser] = useState(post.userId);
    const [addReqStatus, setAddReqStatus] = useState('idle')

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);

    const userOptions = users.map((item) => {
        return <option key={item.id} value={item.id}>
            {item.name}
        </option>
    })

    const canSave = Boolean(user) && Boolean(content) && Boolean(title);

    const onSavePostClicked = () => {
        try {
            setAddReqStatus('pending');
            dispatch(
               updatePost({
                   id: postId,
                   title,
                   content,
                   userId: user,
                   reactions: post.reactions,
               })
            ).unwrap();

            navigate(`/post/${postId}`)
        } catch (e) {

        } finally {
            setAddReqStatus('idle');
        }
    }

    const onDeletePostClicked = () => {
        try {
            setAddReqStatus('pending');
            dispatch(
                deletePost(postId)
            ).unwrap();

            navigate(`/`)
        } catch (e) {

        } finally {
            setAddReqStatus('idle');
        }
    }


    return <section>
        <h2>Edit post</h2>
        <form>
            <label htmlFor='postTitle'></label>
            <input
                type='text'
                id='postTitle'
                name='postTitle'
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor='user'>User</label>
            <select
                id='user'
                name='user'
                onChange={onUserChange}
                value={user}>
                <option value=''></option>
                {userOptions}
            </select>
            <label htmlFor='content'>Content</label>
            <textarea
                id='content'
                name='content'
                value={content}
                onChange={onContentChange}/>
            <button type='button'
                    disabled={!canSave && addReqStatus === 'idle'}
                    onClick={onSavePostClicked}>
                Save post
            </button>
            <button type='button'
                    disabled={addReqStatus !== 'idle'}
                    onClick={onDeletePostClicked}>
                Delete post
            </button>
        </form>
    </section>
}

export default EditPost;
