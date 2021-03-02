import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../Login/Login"
import Home from "../Home/Home"
import SignUp from "../SignUp/SignUp";
import { PrivateRoute } from '../../Utils/PrivateRoute';
function App() {
    return (<Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>My Page</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/sign-up" component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </div></Router>
    );
}

export default App;