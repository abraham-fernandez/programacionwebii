import React, { Component } from "react";
import { userService } from '../../Utils/user.service';
import { withSnackbar } from 'notistack';

 class Login extends Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
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
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }


        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {

                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    const all={pathname:from.pathname,state:{username}}
                    this.props.enqueueSnackbar('Login correcto.',{ variant: 'success',})
                    this.props.isLoggedin(true)
                    this.props.history.push(all);
                },
                error => {

                    this.setState({ error, loading: false })

                    this.props.enqueueSnackbar(error,{ variant: 'error',})
                }
            );

    }
    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (

                <form name="form" onSubmit={this.handleSubmit}>
                    <h2>Login</h2>
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
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Login</button>

                    </div>

                </form>

        );
    }
}
export default withSnackbar(Login);