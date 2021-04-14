import React, {useState, useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "./TextInput.jsx";
import AuthContext from "../AuthContext.js";

const SignIn = ({returnTo}) => {
    const {logIn, isLoggedIn} = useContext(AuthContext);

    const [formValues, setFormValues] = useState({name: ""});

    if (isLoggedIn) return <Redirect to={returnTo}/>;

    const handleInputChange = (event) => {
        const target = event.target;
        setFormValues({...formValues, [target.name]: target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        logIn(formValues);
    };

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card__header">
                        <h1>Sign In</h1>
                        <div className="center">
                            <form onSubmit={handleSubmit}>
                                <TextInput
                                    placeholder="Name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <button type="submit" className="card__header-button">INICIAR SESIÓN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
SignIn.propTypes = {
    returnTo: PropTypes.string.isRequired,
};

export default SignIn;