import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";

import history from "../Utilities/history";
import Button from "@material-ui/core/Button";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import { authenticationService } from "../Services/authenticationService";
const btn1 = {
    border: '5px solid pink',
    display: 'table',
    padding: '6px',
    paddingRight: '22px',
    textDecoration: 'none'
    
  };
  const btn2 = {
    border: '5px solid pink',
    display: 'table',
    padding: '6px',
    marginTop: '10px',
    textDecoration: 'none'
  };
  const div = {
    position:'absolute',
    top:'50%',
    left:'70%', 
    transform:'translate(-50%, -50%)',
    width:'50%'
  }
const Main = () => {
  const [page, setPage] = useState("main");

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push("/chat");
    }
  }, []);

  const handleClick = location => {
    setPage(location);
  };
  const loginClick = () => {
    setPage('login');
    console.log(page);
  }
  const registerClick = () => {
    setPage('register');
  }
  let Content;

  if (page === "login") {
    Content = <Login handleClick={handleClick} />;
    return (
      <Container component="main" maxWidth="xs">
        {Content}
      </Container>
    );
  } else if (page === "main") {
    return (
      <div style={div}>
        <Link to="/login" onClick={loginClick} style={btn1}>
          LogIn
        </Link>
        <Link to="/register" onClick={registerClick} style={btn2}>Register</Link>
      </div>
    );
  } else {
    Content = <Register handleClick={handleClick} />;
    return (
      <Container component="main" maxWidth="xs">
        {Content}
      </Container>
    );
  }
};

export default Main;
