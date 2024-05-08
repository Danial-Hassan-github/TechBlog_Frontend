import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import UserEdit from "./userEdit";
const NavBar = (props) => {
  const [userInfo,setUserInfo]=useState({})
  let login = localStorage.getItem("login");
 // setUserInfo(localStorage.getItem('user'))
  const navigate=useNavigate();
  function logout(){
    localStorage.removeItem('login')
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(()=>{
    //get user as object by deserializing
    setUserInfo(JSON.parse(localStorage.getItem('user')))
  },[])
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">B4-Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
          <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            </Nav>
            { login && (
              <>
              <Nav className="me-auto">
            <Nav.Link as={Link} to="/addBlog">
              Add Post
            </Nav.Link>
            <Nav.Link as={Link} to="/feed">
              News Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/myPosts">
              My Posts
            </Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Facebook</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Instagram</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Twitter
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Linkedin
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
          <Nav.Link eventKey={2} as={Link} to={"/user"} style={{paddingRight:2}}>
          <img src={`http://localhost:8080/users/${userInfo.image}`} className="mb-1" alt="" height={17} width={17} style={{borderRadius:50}}/>
            {userInfo.username}
          </Nav.Link>
        </Nav>
              </>
            )}
            {!login && (
            <>
            <Nav className="me-auto">
            <Nav.Link href="#">
              About
            </Nav.Link>
            <Nav.Link href="#">
              Contact us
            </Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Facebook</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Instagram</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Twitter
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Linkedin
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </Nav>
            </>
            )}
          </Navbar.Collapse>
        </Container>
        </Navbar>
    </Fragment>
  );
};
export default NavBar;
