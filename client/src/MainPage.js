import React, { Component } from "react";
import axios from "axios";

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
      <div>
        <h1>Hello {this.state.username}</h1>
        <p>Your current balance is {this.state.balance} dollars</p>

        <a href="auth/logout">logout</a>
        <button>Transfer Money</button>
        <button>Withdraw</button>
      </div>
    );
  }
}

export default MainPage;
