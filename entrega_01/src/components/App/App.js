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
    handleChangeState(flag){
        this.setState({isAuthenticated:flag})
    }


    render() {
        return (<Router>
                <div className="App">
                    <Navbar isLoggedin={this.state.isAuthenticated} changeLoginState={this.handleChangeState.bind(this)}/>

                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <PrivateRoute exact path="/" component={Home}/>
                                <Route path="/login" render={(props) =>
                                    <Login  {...props} isLoggedin={this.handleChangeState.bind(this)}/>
                                }/>
                                <Route path="/sign-up" component={SignUp}/>
                                <PrivateRoute path="/tetris" component={Tetris}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;