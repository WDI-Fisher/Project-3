import React, { Component } from "react";
import { browserHistory } from "react-router";
import update from "react-addons-update";

import Nav from "../Nav/Nav";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:{}
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8000/users`, {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ user: data });
        console.log("signup.js component did mount data:", data); // logs as empty object
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  handleChange(event) {
    let newState = update(this.state, {
      user: {
        $merge: {
           [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state.user);

    fetch(`http://localhost:8000/users/signup`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      browserHistory.push("/");
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  render(){
    return(
      <div>
        <Nav />
        <div className="container">
          <h2>Create an Account</h2>
          <div className="form-container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <h4>First name:</h4>
              <input name="firstname" type="text" className="signup-form" onChange={this.handleChange.bind(this)} />
              <h4>Last name:</h4>
              <input name="lastname" type="text" className="signup-form" onChange={this.handleChange.bind(this)} />
              <h4>Email:</h4>
              <input name="email" type="email" className="signup-form" onChange={this.handleChange.bind(this)} />
              <h4>Username:</h4>
              <input name="username" type="text" className="signup-form" onChange={this.handleChange.bind(this)} />
              <h4>Password:</h4>
              <input name="password_digest" type="password" className="signup-form" onChange={this.handleChange.bind(this)} />
              <br />
              <button className="standard-btn" type="submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
