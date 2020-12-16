import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "../utils";
import SideBar from "./admin/SideBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user.token);
  return (
    <div className="">
      <div className="">
        <SideBar />
      </div>
      <div className=""></div>
      <div className="col-12 col-md-10">
        <Route
          {...rest}
          render={(props) =>
            isAdmin(token) ? <Component {...props} /> : <Redirect to="/" />
          }
        />
      </div>
    </div>
  );
};

export default PrivateRoute;
