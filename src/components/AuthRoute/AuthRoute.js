import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "./../../services/AuthService";

/**
 *
 * @param Component
 * @param render
 * @param rest
 * @return {*}
 * @constructor
 */
function AuthRoute({ component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const logged = AuthService.isAuthenticated();

        if (!logged) {
          return <Redirect to={"/login"} />;
        }

        if (Component !== undefined) {
          return <Component {...props} />;
        } else if (render !== undefined) {
          return render(props);
        }
      }}
    />
  );
}

export default AuthRoute;
