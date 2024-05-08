import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate()
  let userInfo=JSON.parse(localStorage.getItem('user'))

  function addBlog(post) {
    let formData = new FormData();
    formData.append("post_title", post.post_title);
    formData.append("post_description", post.post_description);
    if(post.file!==undefined){
      formData.append("file", post.file);
    }
    axios.post(`http://localhost:8080/posts/category/${post.post_category.category_id}/user/${userInfo.user_id}`, formData).then(
      (success) => {
        alert("post created")
        navigate('/feed')
      },
      (error) => {
        alert("post not added..")
      }
    );
  }

  function addPost(e) {
    e.preventDefault();
    addBlog(post);
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
  return (
    <div className="" style={{ maxWidth: 700, margin: "auto" }}>
      <form onSubmit={addPost}>
        <div className="mb-2 text-center" controlId="formBasicEmail">
          <label for="file" style={{ cursor: "pointer" }}>
            Add Picture
          </label>
          <input
            type="file"
            hidden
            accept="image/*"
            name="file"
            id="file"
            onChange={(e) => setPost({ ...post, file: e.target.files[0] })}
          />
        </div>

        <Dropdown>
      <Dropdown.Toggle variant="success" required id="dropdown-basic">
        Select Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((category)=>(
            <Dropdown.Item onClick={(e)=>setPost({...post, post_category:category})}>{category.category_name}</Dropdown.Item>
        ))
        }
      </Dropdown.Menu>
    </Dropdown>

        <input
          className="form-control"
          placeholder="Enter Blog title"
          name="post_title"
          required
          onChange={(e) => setPost({ ...post, post_title: e.target.value })}
        />

        <textarea
          className="form-control"
          rows={4}
          name="post_description"
          placeholder="Enter Blog Description"
          onChange={(e) =>
            setPost({ ...post, post_description: e.target.value })
          }
        />

        <Button type="submit">Submit</Button>
        <Button type="reset" className="m-1">
          Reset
        </Button>
      </form>
    </div>
  );
};
export default AddBlog;
