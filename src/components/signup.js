import axios from "axios";
import { useState } from "react";
import { Button } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCamera,faCameraRetro,faCameraAlt} from "@fortawesome/free-solid-svg-icons"
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [user, setUser] = useState({});
  const navigate=useNavigate()
  function addUser(user) {
    console.log(user)
    let formData=new FormData();
    if(user.about!==undefined){
      formData.append("about",user.about)
    }
    if(user.file!==undefined){
      formData.append("file",user.file)
    }
    formData.append("password",user.password)
    formData.append("email",user.email)
    formData.append("username",user.username)
    axios.post("http://localhost:8080/users/", formData).then(
      (success) => {
        alert("user added successfully");
        localStorage.setItem('login',true)
        validateLogin(user.email,user.password)
        //navigate('/')
      },
      (error) => {
        alert("user not added")
      }
    );
  }

  function signupUser(e){
    e.preventDefault()
    addUser(user)
  }

  const validateLogin=(email,password)=>{
    axios.get(`http://localhost:8080/users/${email}/${password}`).then((success)=>{
      if(success.data!=""){
        let user_serialized=JSON.stringify(success.data)
        localStorage.setItem('user',user_serialized)
        navigate('/feed')
      }else{
        alert("user not found")
      }
    },(error)=>{
      alert("login unsuccessful")
    })
  }

  return (
    <div className='container' style={{maxWidth:600}}>
    <Form onSubmit={signupUser} enctype="multipart/form-data">

      <Form.Group className="mb-2 text-center" controlId="formBasicEmail">
        <Form.Label for="file" style={{cursor:"pointer"}}><FontAwesomeIcon  fontSize={100} style={{color:"blue"}} icon={faCamera}></FontAwesomeIcon><br/>Add Profile</Form.Label>
        <Form.Control type="file" hidden  accept="image/*" name='file' id='file' onChange={(e)=>setUser({...user,file:e.target.files[0]})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter name</Form.Label>
        <Form.Control type="text" required name='username' placeholder="Enter Name" onChange={(e)=>setUser({...user,username:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" onChange={(e)=>setUser({...user,email:e.target.value})} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required minLength={6} maxLength={32} name='password' placeholder="Password" onChange={(e)=>setUser({...user,password:e.target.value})} />
      </Form.Group>

      <div class="form-group">
          <label for="">About Yourself</label>
          <textarea class="form-control" name="about" id="about" rows="4" onChange={(e)=>setUser({...user,about:e.target.value})} />
        </div>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="primary" className="m-2" type="reset">
        Reset
      </Button>
    </Form>
    </div>
  );
};
export default Signup;
