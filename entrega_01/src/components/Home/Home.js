import React from 'react';
import {userService} from '../../Utils/user.service';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            username: localStorage.getItem('username')
        }
        userService.getUser(this.state.username).then(
            user => {
                this.setState({firstName: user.firstName})

            },error => {

                this.props.enqueueSnackbar(error, {variant: 'error',})
            })

    }

    render() {
        return (
            <div>
                <h1>Hi {this.state.firstName}!</h1>
            </div>
        );
    }
}

