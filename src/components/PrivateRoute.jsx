import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "../utils/auth";
import SideBar from "./admin/SideBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user.token);
  return (
    <div className="flex flex-row h-full">
      <SideBar />

      <div className=""></div>
      <div className="px-16 py-4 text-gray-700 bg-gray-200 h-screen w-screen">
        <Route
          {...rest}
          render={(props) =>
            isAdmin(token) ? (
              <Component {...props} />
            ) : (
              <Redirect to="/admin/login" />
            )
          }
        />
      </div>
    </div>
  );
};

export default PrivateRoute;
