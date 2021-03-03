import React, {Component} from 'react';
import {userService} from "../../Utils/user.service";
import { withSnackbar } from 'notistack';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        userService.logout()

        this.state = {
            firstName: '',
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {firstName, username, password, returnUrl} = this.state;

        // stop here if form is invalid
        if (!(firstName && username && password)) {
            return;
        }


        this.setState({loading: true});
        userService.signUp(firstName, username, password)
            .then(
                user => {
                    const {from} = this.props.location.state || {from: {pathname: "/login"}};
                    this.props.history.push(from);
                },
                error =>{
                    this.setState({error, loading: false})
                    this.props.enqueueSnackbar(error,{ variant: 'error',})
                }
            );
    }

    render() {
        const { firstName,username, password, submitted, loading, error } = this.state;
        return (
            <form name="form" onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                    {submitted && !firstName &&
                    <div className="help-block">firstName is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                    <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                    <div className="help-block">Password is required</div>
                    }
                </div>



                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>

        )
    }
}