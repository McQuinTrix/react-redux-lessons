import {useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const userDetail = users.find((item) => item.id === userId);

    return <span>
        by {userDetail ? userDetail.name : 'Unknown Author' }
    </span>
}

export default PostAuthor;
