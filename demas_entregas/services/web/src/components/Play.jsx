import React, {useContext, useState,useEffect} from "react";
import AuthContext from "../AuthContext";

const Play = () => {
    const {user} = useContext(AuthContext);
    const [stat, setStat] = useState([])

    const newGame = () => {

        fetch('http://localhost:3000', {
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
                let data = res.data.createStat

                setStat([<div><label>Estado</label><p>{data.estado}</p><label>Puntacion</label><p>{data.gameScore}</p></div>])
            })
    }


    useEffect(() => {
      newGame();
    }, [])


    return (
        <>  <h1>Nuevo Juego</h1>
            {stat}
        </>
    )

};

export default Play;
