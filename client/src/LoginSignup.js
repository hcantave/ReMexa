import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import { button } from 'react-bootstrap';
import './LoginSignup.css';
import Spacer from 'react-add-space';


class LoginSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  onChange = input => {
    const state = this.state;
    state[input.target.name] = input.target.value;
    this.setState(state);
  };

  onSubmitLogin = input => {
    input.preventDefault();

    const { username, password } = this.state;

    axios.post("/auth/login", { username, password }).then(res => {
      const result = res.data;
      if (result === "success") {
        this.setState({ username: "", password: "", message: "You are in!" });
        this.props.history.push("/MainPage");
      } else {
        this.setState({ message: "Invalid username or password" });
      }
    });
  };

  showSignUpForm = () => {
    //here button handling
    this.setState({ username: "", password: "", message: "" });
    document.getElementById("login-page").style.display = "none";
    document.getElementById("signup-page").style.display = "block";
  };

  showloginForm = () => {
    //here button handling
    this.setState({ username: "", password: "", message: "" });
    document.getElementById("login-page").style.display = "block";
    document.getElementById("signup-page").style.display = "none";
  };

  onSubmitSignup = event => {
    event.preventDefault();
    const { username, password } = this.state;
    axios.post("/auth/signup", { username, password }).then(response => {
      if (response.data === "UserName already existed") {
        this.setState({ message: response.data });
      } else {
        axios
          .post("/auth/login", {
            username: response.data.username,
            password: response.data.password
          })
          .then(resp => {
            console.log(resp.data);
            if (resp.data === "success") {
              console.log("we are signed up and logged in!");
              this.setState({
                message: "we are signed up and logged in!"
              });
              //vanilla js works after all....
              window.location.href = "/MainPage";
            } else {
              this.setState({
                message: "Something went wrong! Please contact us!"
              });
            }
          });
      }
    });
  };

  render() {
    return (
      <div className="container" className ="col-md-4 col-md-offset-4" id="wrap">
        <form onSubmit={this.onSubmitLogin} id="login-page">
        <h2 id="intro-head"> ReMexa </h2>
        <Spacer amount={8} />
          <h3 className="form-signin-heading" id="intro">Please Login to continue</h3>
          <Spacer amount={4} />
          <div id="usercred">
          <label>Username :  </label>
          <input
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            required
          />
          <Spacer amount={1} />
          </div>
          <div id="passcred">
          <label>Password :  </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            required
          />
          </div>
          <Spacer amount={4} />
          <div id="loginbutton">
          {"  "}<button type="submit" className="btn btn-success text-center" >Login</button>
          </div>
          <Spacer amount={1} />
          <p>
          <div id="signupbutton">
            <button onClick={this.showSignUpForm} type ="button" className="btn btn-success btn-lg text-center">Sign up now</button> 
          </div>
          </p>
        </form>
        <form
          onSubmit={this.onSubmitSignup}
          id="signup-page"
          style={{ display: "none" }}
        >
          <h2 id="intro-signup">Sign up for free!</h2>
          <Spacer amount={4} />
          <div id="usercred">
          <label>Username : </label>
          <input
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            required
          />
          </div>
          <Spacer amount={1} />
          <div id="passcred">
          <label>Password : </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            required 
          />
          </div>
          <br></br>
          <div id="loginbutton">
          <button type="submit" className="btn btn-success btn-lg" id="button">Signup</button>
          <Spacer amount={8} />
          </div>
          <div id="signupbutton">
          <p>
           <span id="prompt" id="sprompt">Have a account?</span> <button onClick={this.showloginForm} type ="button" id="button" className="btn btn-success">Login now</button>{" "}
          </p>
          </div>
        </form>

        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default LoginSignup;
