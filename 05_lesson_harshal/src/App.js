import Posts from "./features/posts/Posts";
import AddPost from "./features/posts/AddPost";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./features/posts/SinglePost";
import EditPost from "./features/posts/EditPost";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Posts/>} />
                <Route path="post">
                    <Route index element={<AddPost/>}/>
                    <Route path=":postId" element={<SinglePost/>} />
                    <Route path=":postId/edit" element={<EditPost/>}></Route>
                </Route>
                <Route path="users">
                    <Route index element={<UserList/>}/>
                    <Route path=":userId" element={<UserPage/>}/>
                </Route>

                {/* Catch all - can be replaced with dedicated 404 page */}
                <Route path="*" element={<Navigate to="/" replace/>}>

                </Route>
            </Route>
        </Routes>
    );
}

export default App;
