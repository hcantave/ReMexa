import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import Spacer from "react-add-space";
import "./TransferForm.css";

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
      <div className="col-md-4 col-md-offset-4" align="center">
        <br />
        <div id="form">
          <form onSubmit={this.onSubmit} id="mssg">
            <div id="rec">
              <label>Recipient : </label>
              <input
                type="text"
                name="recipient"
                value={this.state.recipient}
                onChange={this.onChange}
                required
              />
            </div>
            <div id="am">
              <label>Amount : </label>
              <input
                type="number"
                name="amount"
                value={this.state.amount}
                onChange={this.onChange}
                required
              />
            </div>
            <Spacer amount={1} />
            <div id="buts">
              <button
                onClick={this.verify}
                type="button"
                class="btn btn-success"
              >
                Verify
              </button>
              {"        "}
              <button type="submit" class="btn btn-success">
                Submit
              </button>
              <Spacer amount={8} />
              <button type="button" class="btn btn-outline-danger">
                Cancel
              </button>
            </div>
            <br />
            {this.state.message}
          </form>
        </div>
      </div>
    );
  }
}

export default TransferForm;
