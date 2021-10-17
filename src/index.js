import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
