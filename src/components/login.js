import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate()
  
  const userLogin=(e)=>{
    e.preventDefault();
    validateLogin(email,password);
  }

  const validateLogin=(email,password)=>{
    axios.get(`http://localhost:8080/users/${email}/${password}`).then((success)=>{
      if(success.data!=""){
        let user_serialized=JSON.stringify(success.data)
        localStorage.setItem('user',user_serialized)
        setLogin()
      }else{
        alert("user not found")
      }
    },(error)=>{
      alert("login unsuccessful")
    })
  }

  const setLogin=()=>{
      localStorage.setItem('login',true)
      navigate('/')
  }
  return (
    <div className='container' style={{maxWidth:600}}>
        <Form onSubmit={userLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required minLength={6} maxLength={32} name='password' placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Login;