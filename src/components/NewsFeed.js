import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPencil,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Button, ListGroup, Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { Tab } from "bootstrap";
import AddComment from "./addComment";
const NewsFeed = () => {
  const [postResponse, setPostResponse] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postsLikes, setPostsLikes] = useState([]);
  const [categories, setCategories] = useState([]);
  let userInfo = JSON.parse(localStorage.getItem("user"));
  var post_description = "";
  const [myIndex, setMyIndex] = useState(-1);
  const [isReadMore, setIsReadMore] = useState(false);
  const [subStringLength, setSubStringLength] = useState(250);

  const getPosts = () => {
    axios.get("http://localhost:8080/posts/").then(
      (success) => {
        setPostResponse(success.data);
        setPosts(success.data.posts.content);
        console.log(success.data.posts.content);
      },
      (error) => {}
    );
  };
  useEffect(() => {
    getPosts();
  }, []);

  /*const getComments = () => {
    axios.get("http://localhost:8080/comments/").then(
      (success) => {
        console.log(success.data)
      },
      (error) => {}
    );
  };
  useEffect(() => {
    getComments();
  }, []);*/

  const getPostsLikes = (user_id) => {
    axios.get(`http://localhost:8080/likes/userLikes/${user_id}`).then(
      (success) => {
        setPostsLikes(success.data);
        console.log(success.data);
      },
      (error) => {}
    );
  };
  useEffect(() => {
    getPostsLikes(userInfo.user_id);
  }, []);

  function getCategories() {
    axios.get("http://localhost:8080/categories/").then(
      (success) => {
        setCategories(success.data);
      },
      (error) => {}
    );
  }
  useEffect(() => {
    getCategories();
  }, []);

  function filterByCategory(category_id) {
    axios.get(`http://localhost:8080/posts/category/${category_id}`).then(
      (success) => {
        setSubStringLength(250);
        setPosts(success.data);
      },
      (error) => {}
    );
  }

  function showAllPosts() {
    setPosts(postResponse.posts);
  }

  function setLength(length) {
    setSubStringLength(length);
  }

  function toggleBtn(index, boolean) {
    setMyIndex(index);
    if (!boolean) {
      setIsReadMore(false);
    } else {
      setIsReadMore(true);
    }
    // setIsReadMore(prevState => !prevState)
  }

  /*function likeUnLikePost(post_id,user_id) {
    if (document.getElementById(post_id).value===true) {
      unlikePost(post_id,user_id);
      document.getElementById(post_id).setAttribute("style", "color:white");
      document.getElementById(post_id).setAttribute("value",false)
    } else {
      likePost(post_id,user_id);
      document.getElementById(post_id).setAttribute("style", "color:blue");
      document.getElementById(post_id).setAttribute("value",true)
    }
  }*/

  function likePost(post_id, user_id) {
    axios
      .post(`http://localhost:8080/likes/likePost/${post_id}/user/${user_id}`)
      .then(
        (success) => {
          getPosts();
          getPostsLikes(userInfo.user_id);
        },
        (error) => {}
      );
  }

  function unlikePost(like_id) {
    axios.post(`http://localhost:8080/likes/unlikePost/user/${like_id}`).then(
      (success) => {
        getPosts();
        getPostsLikes(userInfo.user_id);
      },
      (error) => {}
    );
  }

  function checkLiked(like_id) {
    for (let i = 0; i < postsLikes.length; i++) {
      if (
        postsLikes[i].userId === userInfo.user_id &&
        postsLikes[i].likeId === like_id
      ) {
        return true;
      }
    }
    return false;
  }

  function removePost(post_id) {
    axios.delete(`http://localhost:8080/posts/delete/${post_id}`).then(
      (success) => {
        alert("post deleted");
      },
      (error) => {}
    );
  }

  function showComments(post_id) {
    if (document.getElementById(post_id).hasAttribute("hidden")) {
      document.getElementById(post_id).removeAttribute("hidden");
      document.getElementById(post_id).setAttribute("value", false);
      return;
    }
    document.getElementById(post_id).setAttribute("hidden", true);
  }

  return (
    <div className="container" style={{backgroundColor:"darkgray"}}>
      <div className="row">
        <div className="col-md-3">
          <ListGroup>
            <Link
              className="list-group-item list-group-item-action"
              onClick={showAllPosts}
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                className="list-group-item list-group-item-action"
                onClick={() => filterByCategory(category.category_id)}
              >
                {category.category_name}
              </Link>
            ))}
          </ListGroup>
        </div>
        <div className="col-md-9">
          {posts.map((post, index) => (
            <MDBCard className="mb-2" style={{border:0,backgroundColor:"lightgray"}}>
              {post.image != null && (
                <MDBCardImage
                  src={`http://localhost:8080/posts/image/${post.image}`}
                  position="top"
                  alt=""
                  style={{ maxHeight: 400 }}
                />
              )}
              <MDBCardBody>
                <MDBCardTitle style={{ backgroundColor: "blueviolet" }}>
                  {post.post_title}
                </MDBCardTitle>
                <MDBCardText>
                  <p hidden>{(post_description = post.post_description)}</p>
                  {post_description.length > subStringLength && (
                    <>
                      {index === myIndex && isReadMore ? (
                        <>
                          {post_description}
                          <button
                            className="btn text-primary"
                            onClick={() => toggleBtn(index, false)}
                          >
                            Read Less
                          </button>
                        </>
                      ) : (
                        <>
                          {post_description.substring(0, subStringLength)}...
                          <button
                            className="btn text-primary"
                            onClick={() => toggleBtn(index, true)}
                          >
                            Read More
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {post_description.length <= subStringLength && (
                    <>{post_description}</>
                  )}
                </MDBCardText>
                <div className="text-center">
                  {post.likes.length === 0 ? (
                    <>
                      <Button
                        className="m-1"
                        //value={false}
                        onClick={() => likePost(post.post_id, userInfo.user_id)}
                      >
                        <FontAwesomeIcon
                          style={{ color: "white" }}
                          //id={post.post_id}
                          icon={faThumbsUp}
                        ></FontAwesomeIcon>{" "}
                        0
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="m-1"
                        //value={checkLiked(data.post_id) ? true : false}
                        onClick={
                          checkLiked(post.likes.likeId)
                            ? () => unlikePost(post.likes.likeId)
                            : () => likePost(post.post_id, userInfo.user_id)
                        }
                      >
                        <FontAwesomeIcon
                          style={{
                            color: checkLiked(post.likes.likeId)
                              ? "blue"
                              : "white",
                          }}
                          //id={post.post_id}
                          icon={faThumbsUp}
                        ></FontAwesomeIcon>{" "}
                        {post.likes.length}
                      </Button>
                    </>
                  )}
                  <Button
                    className="m-1"
                    onClick={() => showComments(post.post_id)}
                  >
                    <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
                    {post.comments.length}
                  </Button>
                  {userInfo.user_id === post.user.user_id && (
                    <>
                      <Button className="m-1" color="success">
                        <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                      </Button>
                      <Button
                        className="m-1"
                        color="danger"
                        onClick={() => removePost(post.post_id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                      </Button>
                    </>
                  )}
                </div>
                {/* Comments Section  */}
                {/* Form to Add Comment */}
                <AddComment post_id={post} user_id={post.user}/>
                {/* End of Comment form */}
                <div
                      id={post.post_id}
                      value={true}
                      hidden
                    >
                    <h3>Comments</h3>
                <div style={{
                        maxHeight: 120,
                        backgroundColor: "",
                        overflowY: "scroll",}}>
                {post.comments.map((comment) => (
                  <>
                      <div className="m-0" style={{backgroundColor:"GrayText"}}>
                      <img
                        src={`http://localhost:8080/users/${comment.user.image}`}
                        className="mb-1"
                        alt=""
                        height={20}
                        width={20}
                        style={{ borderRadius: 50 }}
                      />
                      <a href="#action">{comment.user.username}</a>{" "}
                      {comment.description}
                      <br></br>
                      <small style={{ marginLeft: "10%" }}><a>Reply</a></small>
                      </div>
                      {/* <br></br> */}
                      <div style={{ marginLeft: "10%" }}>
                        {/* Replies Section  */}
                        {comment.replies.map((reply) => (
                          <div style={{backgroundColor:"ButtonShadow"}}>
                            <img
                              src={`http://localhost:8080/users/${reply.user.image}`}
                              className="mb-1"
                              alt=""
                              height={20}
                              width={20}
                              style={{ borderRadius: 50 }}
                            />
                            <a href="#action">{reply.user.username}</a>{" "}
                            {reply.reply_description}
                          </div>
                        ))}
                      </div>
                  </>
                ))}
                </div>
                </div>
                {/* </div> */}
                <br></br>
                <p style={{ float: "left" }}>
                  <img
                    src={`http://localhost:8080/users/${post.user.image}`}
                    className="mb-1"
                    alt=""
                    height={22}
                    width={22}
                    style={{ borderRadius: 50 }}
                  />
                  <a href="#action">{post.user.username}</a>
                </p>
                <p style={{ float: "right" }}>{post.post_Date}</p>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewsFeed;
