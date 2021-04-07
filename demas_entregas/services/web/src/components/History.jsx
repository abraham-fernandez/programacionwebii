import React, {useContext, useState} from "react";
import AuthContext from "../AuthContext.js";
import styles from "./history.css";
import ProgressBar from "./StatsBar";

const History = () => {
    const {user} = useContext(AuthContext);

    const [stats, setStats] = useState([])

    const getItems = () => {
        let listItems = []
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query{
                               pairs{
                                  value{
                                      player,
                                     gameScore
                                  }
                               }
                           }`
            }),
        })
            .then(res => res.json())
            .then(res => {

                listItems = Object.values(res.data.pairs).sort((a, b) => b.value.gameScore - a.value.gameScore);
                //valor cada uno entre maximo
                let max = listItems[0].value.gameScore
                listItems.map(e => e.value.percentage =( e.value.gameScore / max) * 100)
               console.log(listItems)
                setStats(listItems.map((e,idx)=> <ProgressBar key={idx} bgcolor="#6a1b9a" player={e.value.player} score={e.value.gameScore} completed={e.value.percentage} />))
            });

    }
    getItems()


    return (
        <>
            <h1>Estadísticas</h1>
            {stats}
        </>
    )

};

export default History;

