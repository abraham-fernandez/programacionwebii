import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../AuthContext";
import styles from './Play.css'
const Play = () => {
    const {user} = useContext(AuthContext);
    const [stat, setStat] = useState([])

    const newGame = () => {

        if(sessionStorage.getItem("state")){
            let data=JSON.parse(sessionStorage.getItem("game"))
            setStat(<div className={styles.price_cards}>
                <div className={styles.card_1}>
                    <h1 className={styles.title}>{user.name}</h1>
                    <section>
                        <ul>
                            <li><label>Puntuacion</label><strong>{data.gameScore} </strong></li>
                            <li><label>Estado</label><strong> {data.estado}</strong></li>
                        </ul>
                    </section>
                </div>
            </div>)
        }else {


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

                    //setStat([<div><label>Estado</label><p>{data.estado}</p><label>Puntacion</label><p>{data.gameScore}</p></div>])
                    setStat(<div className={styles.price_cards}>
                        <div className={styles.card_1}>
                            <h1 className={styles.title}>{user.name}</h1>
                            <section>
                                <ul>
                                    <li><label>Puntuacion</label><strong>{data.gameScore} </strong></li>
                                    <li><label>Estado</label><strong> {data.estado}</strong></li>
                                </ul>
                            </section>
                        </div>
                    </div>)
                })
        }
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
