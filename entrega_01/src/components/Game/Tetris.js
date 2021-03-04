import React,{Component} from "react";
import './Tetris.css'

class Tetris extends Component {
    constructor() {
        super();
        document.addEventListener('DOMContentLoaded', function(event) {
            const script = document.createElement("script");
            script.src = "./game.js";
            script.async = true;

            document.body.appendChild(script);
        });
    }



    render(){

        return(
            <div>

                <div className="logo"></div>
                <div id="container">
                    <div className="fondo">
                        <div className="grid">

                        </div>
                    </div>
                    <div>
                        <div className="mini-grid-cont">
                            <div className="mini-grid">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className="score">
                            <h7>PUNTUACIÓN</h7>
                            <p id="score">0</p>
                            <button id="start-button">Start/Pause</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tetris