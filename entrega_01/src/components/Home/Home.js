import React from 'react';
import { userService } from '../../Utils/user.service';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            firstName:''
        }
        userService.getUser('abraham').then( user =>
        {    console.log(user.firstName)
            this.setState({firstName: user.firstName})

        })



    }



    render() {

        return (
            <div >
                <h1>Hi {this.state.firstName}!</h1>

            </div>
        );
    }
}

