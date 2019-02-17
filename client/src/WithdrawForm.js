import React, { Component } from "react";
import remittance from "./remittance";
import axios from "axios";
import web3 from "./web3";
import Spacer from "react-add-space";

class WithdrawForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      currentContractBalance: 0,
      message: ""
    };
  }

  confirm = input => {
    const ePrice = 128.12;
    const bitso = 2398.79;
    input.preventDefault();
    const amount = this.state.amount;
    const pamount = amount * 19.24;
    const ramount = (amount / ePrice) * bitso;
    const convertionC = amount * 19.24 - ramount;
    const m =
      "your friend will receive " +
      pamount +
      " pesos. The transaction cost will be " +
      convertionC +
      " pesos with ether gas fee";
    this.setState({ message: m });
  };
  onChange = input => {
    const state = this.state;
    state[input.target.name] = input.target.value;
    this.setState(state);
  };

  Withdraw = async input => {
    input.preventDefault();
    //subtract that money
    const ePrice = 128.12;
    const bitso = 2398.79;
    const res = await axios.post("/transfer/submitTransfer", {
      order: {
        recipient: "GOD",
        amount: this.state.amount
      }
    });
    const contractB = await remittance.methods.getContractBalance().call();
    const accounts = await web3.eth.getAccounts();
    console.log(contractB);
    const amount = this.state.amount;
    const eamount = amount / ePrice;
    const pamount = amount * 19.24;
    await remittance.methods.deposit().send({
      from: accounts[0],
      value: web3.utils.toWei(eamount.toString(), "ether")
    });
    this.setState({ message: "processing your transaction!" });
    const contractB1 = await remittance.methods.getContractBalance().call();
    console.log(contractB1);
    const diff = contractB1 - contractB;
    const rp = diff / 1000000000000000000;
    const yeild = bitso * rp;
    console.log(pamount - yeild);
    await remittance.methods
      .send("0xd85F8E620649a6A46f416621382C554fE8194599")
      .send({
        from: accounts[0]
      });
    this.setState({
      message:
        "Your transaction is complete! Your friend got " + yeild + " pesos!"
    });
  };
  render() {
    return (
      <div id="withdraw" style={{ display: "none" }}>
        <h3 id="prompt" align="center">
          Withdraw your money from U.S.
        </h3>
        <form>
          <div id="button">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.onChange}
              required
            />
          </div>
          <div id="buttons">
            <button onClick={this.confirm} className="btn btn-success">
              confirm
            </button>
            <Spacer amount={1} />
            <button onClick={this.Withdraw} className="btn btn-success">
              submit
            </button>
          </div>
          <p align="justify">{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default WithdrawForm;
