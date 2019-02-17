import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React, { Component } from "react";
import axios from "axios";
import TransferForm from "./TransferForm";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      balance: 0
    };
  }
  async componentWillMount() {
    const res = await axios.get("auth/current_user");
    const user = res.data;
    if (!user) {
      console.log("redirecting");
      this.props.history.push("/");
    }
    this.setState({ username: user.username, balance: user.balance });
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <h1>Hello {this.state.username}</h1>
        <p>Your current balance is {this.state.balance} dollars</p>

        <a href="auth/logout">logout</a>
        <button  type ="button" className ="btn btn-outline-success">Transfer Money</button>
        <button type="button" className="btn btn-outline-success">Withdraw</button>

        <br />

        <TransferForm />
      </div>
    );
  }
}

export default MainPage;
