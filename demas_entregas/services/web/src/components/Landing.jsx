import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="container">
            <div className="card">
                <div className="card__header">
                    <h1>Entrega 02</h1>
                    <p>Abraham Fernández</p>
                    <Link to="/sign-in" className="card__header-button">INICIAR</Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;