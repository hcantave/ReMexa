import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import LoginSignup from "./LoginSignup";
import GOD from "./GOD";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

ReactDOM.render(
  <div className="col-md-4 col-md-offset-4">
    <BrowserRouter>
      <Switch>
        <Route path="/MainPage" exact component={MainPage} />
        <Route path="/GOD" exact component={GOD} />
        <Route path="/" exact component={LoginSignup} />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
