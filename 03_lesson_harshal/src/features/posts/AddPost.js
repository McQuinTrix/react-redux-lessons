import {useState} from "react";
import { addPostV2} from "./postsSlice";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

const AddPost = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState();
    const [addReqStatus, setAddReqStatus] = useState('idle')

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);

    const onSavePostClicked = () => {
        try {
            setAddReqStatus('pending');
            // .unwrap makes it act like promise
            dispatch(
                addPostV2({
                    title,
                    content,
                    userId: Number(user),
                })
            ).unwrap();

            setTitle('');
            setContent('');
            setUser('');
        } catch (e) {

        } finally {
            setAddReqStatus('idle');
        }
    }

    const userOptions = users.map((item) => {
        return <option key={item.id} value={item.id}>
            {item.name}
        </option>
    })

    const canSave = Boolean(user) && Boolean(content) && Boolean(title);

    return <section>
        <h2>Add new post</h2>
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
                value={content} onChange={onContentChange}/>
            <button type='button'
                    disabled={!canSave && addReqStatus === 'idle'}
                    onClick={onSavePostClicked}>
                Save post
            </button>
        </form>
    </section>
}

export default AddPost;
