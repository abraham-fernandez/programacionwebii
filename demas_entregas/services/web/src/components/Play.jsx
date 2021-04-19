import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../AuthContext";

const Play = () => {
    const {user} = useContext(AuthContext);
    const [stat, setStat] = useState([])

    const newGame = () => {

        if(sessionStorage.getItem("state")){
            let data=JSON.parse(sessionStorage.getItem("game"))
            setStat(<div className="container">
                <div className="card">
                    <div className="card__header">
                        <h1>Player: {user.name}</h1>
                        <div>
                            <p style={{marginBottom:"0px"}}><strong>Points: </strong>{data.gameScore}</p>
                            <p><strong>State: </strong> {data.estado} </p>
                        </div>
                    </div>
                </div>
            </div>)
            sessionStorage.removeItem("game")
            sessionStorage.removeItem("state")
        }else {


            fetch('https://graphql-abraham.glitch.me/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query: `mutation{
                      createStat(player:"${user.name}",estado:"terminada",gameScore:${parseInt(Math.random() * 200)}){
                        player,
                        estado,
                        gameScore
                      }
                               
                }`
                }),
            }).then(res => res.json())
                .then(res => {
                    if (res.data.createStat != null){
                        let data = res.data.createStat


                    //setStat([<div><label>Estado</label><p>{data.estado}</p><label>Puntacion</label><p>{data.gameScore}</p></div>])
                    setStat(
                        <div className="container">
                            <div className="card">
                                <div className="card__header">
                                    <h1>Player: {user.name}</h1>
                                    <div>
                                        <p style={{marginBottom: "0px"}}><strong>Points: </strong>{data.gameScore}
                                        </p>
                                        <p><strong>State: </strong> {data.estado} </p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }else{
                        window.alert("Problema servidor")
                    }


                })
        }
    }


    useEffect(() => {
        newGame();
    }, [])


    return (
        <>
            {stat}
        </>
    )

};

export default Play;
