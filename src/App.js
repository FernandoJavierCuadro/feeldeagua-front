import "./App.css";
import React from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Intro from "./components/regular/page/Intro";
import Discos from "./components/regular/page/Discos";
import Artists from "./components/regular/page/Artists";
import Artist from "./components/regular/page/Artist";
import Login from "./components/admin/page/Login";
import AdminArtists from "./components/admin/page/AdminArtists";
import ArtistCreateForm from "./components/admin/page/ArtistCreateForm";
import ArtistUpdateForm from "./components/admin/page/ArtistUpdateForm";
import AdminAlbums from "./components/admin/page/AdminAlbums";
import AlbumCreateForm from "./components/admin/page/AlbumCreateForm";
import AlbumUpdateForm from "./components/admin/page/AlbumUpdateForm";

function App() {
  return (
    <Router>
      <Switch>
        <Intro path="/" exact />
        <PublicRoute
          restricted={false}
          component={Discos}
          path="/discos"
          exact
        />
        <PublicRoute
          restricted={false}
          component={Artists}
          path="/artistas"
          exact
        />
        <PublicRoute
          restricted={false}
          component={Artist}
          path="/artistas/:artist"
          exact
        />

        <PublicRoute restricted={false} component={Login} path="/admin/login" />
        <PrivateRoute component={AdminArtists} path="/admin/artists" exact />
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
        <PrivateRoute component={AdminAlbums} path="/admin/albums" exact />
        <PrivateRoute
          component={AlbumCreateForm}
          path="/admin/albums/create"
          exact
        />
        <PrivateRoute
          component={AlbumUpdateForm}
          path="/admin/albums/:album"
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
