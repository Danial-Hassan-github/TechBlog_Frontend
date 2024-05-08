import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCommentAlt, faCommentDots, faEdit, faPencilAlt, faThumbsUp, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postsLikes, setPostsLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  let post_description = "";
  const [myIndex, setMyIndex] = useState(-1);
  const [isReadMore, setIsReadMore] = useState(false);
  //get user as object by deserializing
  let userInfo = JSON.parse(localStorage.getItem("user"));
  var length = 0;
  const [subStringLength, setSubStringLength] = useState(250);

  function filterByUser(user_id) {
    axios.get(`http://localhost:8080/posts/user/posts/${user_id}`).then(
      (success) => {
        setPosts(success.data);
        setAllPosts(success.data);
      },
      (error) => {}
    );
  }

  useEffect(() => {
    filterByUser(userInfo.user_id);
  }, []);

  const getPostsLikes = (user_id) => {
    axios.get(`http://localhost:8080/likes/userLikes/${user_id}`).then(
      (success) => {
        setPostsLikes(success.data);
      },
      (error) => {}
    );
  };
  useEffect(() => {
    getPostsLikes(userInfo.user_id);
  }, []);

  function filterByCategory(category_id, user_id) {
    axios
      .get(
        `http://localhost:8080/posts/category/${category_id}/user/${user_id}`
      )
      .then(
        (success) => {
          setSubStringLength(250);
          setPosts(success.data);
        },
        (error) => {}
      );
  }

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

  function showAllPosts() {
    setPosts(allPosts);
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
  }

  /*function likeUnLikePost(post_id,user_id) {
    if (document.getElementById(post_id).value===true) {
      unlikePost(post_id,user_id);
      document.getElementById(post_id).setAttribute("style", "color:white");
      document.getElementById(post_id).value=false
    } else {
      likePost(post_id,user_id);
      document.getElementById(post_id).setAttribute("style", "color:blue");
      document.getElementById(post_id).value=true
    }
  }*/

  function likePost(post_id,user_id) {
    axios.post(`http://localhost:8080/likes/likePost/${post_id}/user/${user_id}`).then(
      (success) => {
        filterByUser(user_id)
        getPostsLikes(user_id);
        //alert("liked")
      },
      (error) => {}
    );
  }

  function unlikePost(post_id,user_id) {
    axios.post(`http://localhost:8080/likes/unlikePost/${post_id}/user/${user_id}`).then(
      (success) => {
        filterByUser(user_id)
        getPostsLikes(user_id);
      },
      (error) => {}
    );
  }

  function checkLiked(post_id,user_id){
    for (let i = 0; i < postsLikes.length; i++) {
      if(postsLikes[i].user_id===user_id && postsLikes[i].post_id===post_id){
        return true;
      }
    }
    return false;
  }

  function removePost(post_id){
    axios.delete(`http://localhost:8080/posts/delete/${post_id}`).then(
      (success) => {
        alert("post deleted")
      },
      (error) => {}
    );
  }

  return (
    <>
      <div className="container">
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
                  onClick={() =>
                    filterByCategory(category.category_id, userInfo.user_id)
                  }
                >
                  {category.category_name}
                </Link>
              ))}
            </ListGroup>
          </div>
          <div className="col-md-9">
            {posts.map((data, index) => (
              <MDBCard className="mb-2">
                {data.image != null && (
                  <MDBCardImage
                    src={`http://localhost:8080/posts/image/${data.image}`}
                    position="top"
                    alt="."
                    style={{ maxHeight: 400 }}
                  />
                )}
                <MDBCardBody>
                  <MDBCardTitle>{data.post_title}</MDBCardTitle>
                  <MDBCardText>
                    <p hidden>{(post_description = data.post_description)}</p>
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
                  {data.likes.length===0 ? (
                  <>
                  <Button
                          className="m-1"
                          //value={false}
                          onClick={() => likePost(data.post_id,data.user_id)}
                        >
                          <FontAwesomeIcon
                            style={{ color: "white" }}
                            id={data.post_id}
                            icon={faThumbsUp}
                          ></FontAwesomeIcon>{" "}
                          0
                        </Button>
                  </>
                ):(
                  <>
                  <Button
                          className="m-1"
                          //value={checkLiked(data.post_id) ? true : false}
                          onClick={checkLiked(data.post_id,data.user.user_id) ? ()=>unlikePost(data.post_id,data.user.user_id) : ()=>likePost(data.post_id,data.user.user_id)}
                        >
                          <FontAwesomeIcon
                            style={{ color: checkLiked(data.post_id,data.user.user_id) ? "blue" : "white" }}
                            id={data.post_id}
                            icon={faThumbsUp}
                          ></FontAwesomeIcon>{" "}
                          {data.likes.length}
                        </Button>
                  </>
                )}
                <Button className=""><FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon></Button>
                <Button className="" color="success"><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></Button>
                <Button className="" color="danger" onClick={()=>removePost(data.post_id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button>
                  <br></br>
                  <p style={{ float: "left" }}>
                    <img 
                      src={`http://localhost:8080/users/${data.user.image}`}
                      className="mb-1"
                      alt=""
                      height={22}
                      width={22}
                      style={{ borderRadius: 50 }}
                    />
                    <a href="#">{data.user.username}</a>
                  </p>
                  <p style={{ float: "right" }}>{data.post_Date}</p>
                </MDBCardBody>
              </MDBCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPosts;
