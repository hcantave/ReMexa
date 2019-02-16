import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import LoginSignup from "./LoginSignup";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Switch } from "react-router";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/MainPage" component={MainPage} />
        <Route path="/" component={LoginSignup} />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
