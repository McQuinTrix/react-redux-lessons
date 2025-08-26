import Posts from "./features/posts/Posts";
import AddPost from "./features/posts/AddPost";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./features/posts/SinglePost";
import EditPost from "./features/posts/EditPost";

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
            </Route>
        </Routes>
    );
}

export default App;
