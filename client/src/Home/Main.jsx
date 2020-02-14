import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Login from "./Login";
import Register from "./Register";
import { Link } from 'react-router-dom';

const btn = {
  border: '5px solid pink',
  display: 'table',
  padding: '8px',
  margin: '0 auto'
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: ""
    };
    
//     let Content;

//     if (this.state.page === "login") {
//       Content = <Login handleClick={} />;
//     } else {
//       Content = <Register handleClick={handleClick} />;
//     }
//   }
//   onSubmitLogin(e) {
//     e.preventDefault();
//     this.setState({
//       page: "login"
//     });
//   }
//   onSubmitRegister(e) {
//     e.preventDefault();
//     this.setState({
//       page: "register"
//     });
  }

  render() {
    return (
      <div>
        {/* <input
          type="Submit"
          value="login"
          className="btn btn-primary"
          onClick={this.onSubmitLogin}
        />
        <input
          type="Log In"
          value="login"
          className="btn btn-primary"
          onClick={this.onSubmitRegister}
        /> */}
        <Link to="/login" style={btn}>LogIn</Link>
        <Link to="/register" style={btn}>Register</Link>
        
      </div>
    );
  }
}

export default Main;
