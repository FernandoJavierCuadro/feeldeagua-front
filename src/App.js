import "./App.css";
import React from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/admin/page/Login";
import Home from "./components/regular/page/Home";
import Artists from "./components/admin/page/Artists";
import ArtistCreateForm from "./components/admin/page/ArtistCreateForm";
import ArtistUpdateForm from "./components/admin/page/ArtistUpdateForm";
import Albums from "./components/admin/page/Albums";
import AlbumCreateForm from "./components/admin/page/AlbumCreateForm";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />

        <PublicRoute restricted={false} component={Login} path="/admin/login" />
        <PrivateRoute component={Artists} path="/admin/artists" exact />
        <PrivateRoute
          component={ArtistCreateForm}
          path="/admin/artists/create"
          exact
        />
        <PrivateRoute
          component={ArtistUpdateForm}
          path="/admin/artists/:artist"
          exact
        />
        <PrivateRoute component={Albums} path="/admin/albums" exact />
        <PrivateRoute
          component={AlbumCreateForm}
          path="/admin/albums/create"
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
