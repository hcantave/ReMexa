import React, { Component } from "react";
import axios from "axios";

class GOD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  pass2 = async event => {
    event.preventDefault();
    const res = await axios.get("/GOD/pastTwoMonth");
    this.setState({ message: "You just fastforwarded 2 month" });
  };

  pass6 = async event => {
    event.preventDefault();
    const res = await axios.get("/GOD/pastSixMonth");
    this.setState({ message: "You just fastforwarded 6 month" });
  };

  render() {
    return (
      <div>
        <button onClick={this.pass2}>Let 2 month pass</button>
        <br />
        <button onClick={this.pass6}>Let 6 month pass</button>
      </div>
    );
  }
}

export default GOD;
