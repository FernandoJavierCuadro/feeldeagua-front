import React from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "./regular/Footer";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <div className="container mx-auto">
      <Route
        {...rest}
        render={(props) =>
          restricted ? <Redirect to="/" /> : <Component {...props} />
        }
      />
      <Footer />
    </div>
  );
};

export default PublicRoute;
