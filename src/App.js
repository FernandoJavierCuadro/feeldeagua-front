import "./App.css";
import React from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/regular/page/Home";
import Main from "./components/admin/page/Main";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />

        <PrivateRoute restricted={true} component={Main} path="/admin" exact />
      </Switch>
    </Router>
  );
}

export default App;
