import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../Login/Login"
import Home from "../Home/Home"
import SignUp from "../SignUp/SignUp";
import { PrivateRoute } from '../../Utils/PrivateRoute';
import Navbar from "../Navbar/Navbar";
import Tetris from "../Game/Tetris";

class App extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated:localStorage.getItem('token')?true:false
        };


    }

    render() {
        return (<Router>
                <div className="App">
                    <Navbar isLoggedin={this.state.isAuthenticated}/>

                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <PrivateRoute exact path="/" component={Home}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/sign-up" component={SignUp}/>
                                <Route path="/tetris" component={Tetris}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;