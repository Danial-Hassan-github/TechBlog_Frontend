import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./home";
import NewsFeed from "./NewsFeed";
import AddBlog from "./addBlog";
import Signup from "./signup";
import Login from "./login";
import PrivateRoutes from "./protectedRoutes";
import UserEdit from "./userEdit";
import MyPosts from "./myPosts";
const ContentRoutes=()=>{
    return(
            <Routes>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/feed" element={<PrivateRoutes Component={NewsFeed}/>}/>
                <Route exact path="/addBlog" element={<PrivateRoutes Component={AddBlog}/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/user" element={<PrivateRoutes Component={UserEdit}/>}></Route>
                <Route exact path="/myPosts" element={<PrivateRoutes Component={MyPosts}/>}></Route>
            </Routes>
    )
}
export default ContentRoutes;