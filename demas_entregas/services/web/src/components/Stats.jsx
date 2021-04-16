import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext.js";
import ProgressBar from "./StatsBar.jsx";


const Stats = () => {
    const {user} = useContext(AuthContext);
    const mdColors = [
        '#F44336',
        '#F06292',
        '#F50057',
        '#C51162',
        '#9C27B0',
        '#F3E5F5',
        '#E1BEE7',
        '#CE93D8',
        '#BA68C8',
        '#AA00FF',
        '#673AB7',
        '#EDE7F6',
        '#D1C4E9',
        '#B39DDB',
        '#9575CD',
        '#7E57C2',
        '#673AB7',
        '#5E35B1',
        '#512DA8',
        '#4527A0',
        '#303F9F',
        '#283593',
        '#1A237E',
        '#8C9EFF',
        '#536DFE',
        '#3D5AFE',
        '#304FFE',
        '#2196F3',
        '#E3F2FD',
        '#BBDEFB',
        '#90CAF9',
        '#64B5F6',
        '#E1F5FE',
        '#B3E5FC',
        '#81D4FA',
        '#4FC3F7',
        '#29B6F6',
        '#03A9F4',
        '#039BE5',
        '#0288D1',
        '#0277BD',
        '#01579B',
        '#80D8FF',
        '#84FFFF',
        '#18FFFF',
        '#00E5FF',
        '#00B8D4',
        '#009688',
        '#E0F2F1',
        '#00BFA5',
        '#4CAF50',
        '#E8F5E9',
        '#C8E6C9',
        '#A5D6A7',
        '#81C784',
        '#66BB6A',
        '#4CAF50',
        '#43A047',
        '#388E3C',
        '#CCFF90',
        '#B2FF59',
        '#76FF03',
        '#64DD17',
        '#CDDC39',
        '#F9FBE7',
        '#F0F4C3',
        '#FDD835',
        '#FBC02D',
        '#F9A825',
        '#F57F17',
        '#FFFF8D',
        '#FFFF00',
        '#FFEA00',
        '#FFD600',
        '#FFC107',
        '#FFF8E1',
        '#FFECB3',
        '#FFE082',
        '#FFD54F',
        '#FFCA28',
        '#FFC107',
        '#FFB300',
        '#FFA000',
        '#FF8F00',
        '#FF6F00',
        '#FFE57F',
        '#FFD740',
        '#FFC400',
        '#FFAB91',
        '#FF8A65',
        '#FF7043',
        '#FF5722',
        '#F4511E',
        '#E64A19',
        '#D84315',
        '#BF360C',
        '#FF9E80',
        '#FF6E40',
        '#FF3D00',
        '#DD2C00',
        '#795548',
        '#EFEBE9',

    ];

    const [stats, setStats] = useState([])
    const [topThree, setTopThree] = useState([])
    const [numGames, setnumGames] = useState()

    const getNumGames = () => {
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query{
                        numGames                   
                  }`
            }),
        })
            .then(res => res.json())
            .then(res => {
                if(res.data.numGames!=null)
                    setnumGames(<div>  <label>Numero de Partidas: </label>{res.data.numGames}</div>)

            })
    }

    const getTopThree = () => {
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query{
                        pairsTopThree{
                          player,                          
                          gameScore
                        }
                  }`
            }),
        })
            .then(res => res.json())
            .then(res => {
                if(res.data.pairsTopThree!=null)
                    setTopThree(res.data.pairsTopThree.map(top => <div>
                        <label>Player:</label> {top.player}  <label>Score: </label>{top.gameScore}
                    </div>))

            })

    }

    const getItems = () => {
        let listItems = []
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query{
                        pairs{
                          player,
                          estado,
                          gameScore
                        }
                  }`
            }),
        })
            .then(res => res.json())
            .then(res => {
                if(res.data.pairs!=null)

                    listItems = Object.values(res.data.pairs).sort((a, b) => b.gameScore - a.gameScore);
                    //valor cada uno entre maximo
                    let max = listItems[0].gameScore
                    listItems.map(e => e.percentage = (e.gameScore / max) * 100)
                    setStats(listItems.map((e, idx) => <ProgressBar key={idx} bgcolor={mdColors[idx]} player={e.player}
                                                                    estado={e.estado} score={e.gameScore}
                                                                    completed={e.percentage}/>))

            })
    }

    useEffect(() => {
        getItems()
        getTopThree()
        getNumGames()
    }, [])


    // return <p>{user.name}’s stats</p>;
    return (
        <>
            <div className="container mt-120">
                <div  className="stats">
                    <div>
                        <h1><i className="fa fa-chart-bar"></i> Stats </h1>
                        <div>{numGames}</div>
                    </div>
                    <div>
                        <h1><i className="fas fa-award"></i> TOP 3 </h1>
                        <div>{topThree}</div>
                    </div>
                </div>
                <div className="stats__bars">
                    {stats}
                </div>
            </div>
        </>)


};

export default Stats;
