import React,{Component} from "react";
import './Tetris.css'

class Tetris extends Component {

    constructor(props) {
        super(props);
        this.state={
            reload:false
        }
    }


    componentWillMount() {


        document.addEventListener('DOMContentLoaded', function(event) {
            this.script = document.createElement("script");
            this.script.src = "./game.js";
            this.script.async = true;

            document.body.appendChild(this.script);
        });
        this.setState( {reload:true})


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