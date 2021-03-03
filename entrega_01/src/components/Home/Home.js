import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../../Utils/user.service';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {username:props.location.state.username},

        };
    }

    componentDidMount() {
        // this.setState({
        //     user:'',
        //
        // });

        //userService.getUser().then(users => this.setState({ users }));
    }

    render() {
        const { user } = this.state;
        return (
            <div >
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>

                <p>
                    <Link to="/login" >Logout</Link>
                </p>
            </div>
        );
    }
}

