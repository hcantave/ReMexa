import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class LoginSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = input => {
    const state = this.state;
    state[input.target.name] = input.target.value;
    this.setState(state);
  };

  onSubmit = input => {
    input.preventDefault();

    const { username, password } = this.state;

    axios
      .post("/api/auth/login", { username, password })
      .then(result => {
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });
        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message: "Login failed. Username or password incorrect"
          });
        }
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          {message !== "" && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <h2 class="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" class="sr-only">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="Email address"
            name="username"
            value={username}
            onChange={this.onChange}
            required
          />
          <label for="inputPassword" class="sr-only">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
          <p>
            Sign up now!{" "}
            <Link to="/register">
              <span class="glyphicon glyphicon-plus-sign" aria-hidden="true" />{" "}
              Register here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginSignup;
