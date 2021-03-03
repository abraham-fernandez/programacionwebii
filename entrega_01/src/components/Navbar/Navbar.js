import React, {Component} from "react";
import {Link} from "react-router-dom";
import { userService } from "../../Utils/user.service";
import {withRouter} from 'react-router-dom';
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoggedin:props.isLoggedin
        }


    }
    logoutHandler() {
        userService.logout();
         this.setState({ isLoggedin: false}
         );

    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>My Page</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            {!this.state.isLoggedin && <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>}
                            {!this.state.isLoggedin &&<li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>}
                            {this.state.isLoggedin&&<li><Link onClick={e=>this.logoutHandler(e)} to={"/login"}  >Logout</Link></li>}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}

export default withRouter(Navbar);