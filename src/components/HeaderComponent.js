import React from "react";
import AuthenticationService from "./AuthenticationService.js";
import {
  Link
} from "react-router-dom";

function HeaderComponent() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    console.log(isUserLoggedIn);
  
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="navbar-brand">App</div>
            <ul className="navbar-nav">
              <li>
                <Link className="nav-link" to="/welcome/:name">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }

export default HeaderComponent;