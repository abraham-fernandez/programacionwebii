import config from 'config';
import { authHeader } from '../__helpers/auth-header';

export const userService = {
    login,
    logout,
    signUp
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  password })
    };

    return fetch(`${config.apiUrl}/users/`+username+'/sessions', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                console.log(user)
                localStorage.setItem('token', JSON.stringify( user.sessionToken));
            }

            return user;
        })

}

function signUp(firstName,username, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({firstName,password })
    };
    return fetch(`${config.apiUrl}/users/`+username, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('token', JSON.stringify(user.username));
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}



const handleResponse=(response)=> {

    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.details) || response.statusText;

            return Promise.reject(error);
        }

        return data;
    });
}