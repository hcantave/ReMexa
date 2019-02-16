import React, { Component } from "react";
import axios from "axios";
class TransferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: "",
      amount: 0,
      message: "",
      verified: false
    };
  }

  onChange = input => {
    const state = this.state;
    state[input.target.name] = input.target.value;
    this.setState(state);
  };

  onSubmit = async event => {
    event.preventDefault();
    if (this.state.verified) {
      const res = await axios.post("/transfer/submitTransfer", {
        order: {
          recipient: this.state.recipient,
          amount: this.state.amount
        }
      });

      if (res.data === "successfully transferred and recorded") {
        this.setState({
          recipient: "",
          amount: 0,
          message: "",
          verified: false
        });
        window.location.href = "/MainPage";
      } else {
        this.setState({ message: "something very wrong! Contact us." });
      }
    } else {
      this.setState({ message: "please verify your payment first!" });
    }
  };
  verify = async event => {
    event.preventDefault();
    const response = await axios.post("/transfer/verifyValid", {
      recipient: this.state.recipient,
      amount: this.state.amount
    });
    if (response.data.recipientValid && response.data.balanceOK) {
      this.setState({ message: "Ready to send!", verified: true });
    } else {
      this.setState({ message: "", verified: false });

      if (!response.data.recipientValid) {
        this.setState({ message: "The user does not exist. " });
      }
      if (!response.data.balanceOK) {
        this.setState({
          message: this.state.message + "You don't have enough balance"
        });
      }
    }
  };

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.onSubmit}>
          <label>Recipient</label>
          <input
            type="text"
            name="recipient"
            value={this.state.recipient}
            onChange={this.onChange}
            required
          />
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.onChange}
            required
          />
          <button onClick={this.verify}>Verify</button>
          <button type="submit">submit</button>
          <button>Cancel</button>
          <br />
          {this.state.message}
        </form>
      </div>
    );
  }
}

export default TransferForm;
