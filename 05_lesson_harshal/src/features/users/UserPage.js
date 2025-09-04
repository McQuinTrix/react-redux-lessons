import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, +userId));

    const postsByUser = useSelector((state) => selectPostsByUser(state, +userId));

    const renderedPosts = postsByUser.map((post) => {
        return (
            <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
        )
    })

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {renderedPosts}
            </ol>
        </section>
    )
}

export default UserPage;