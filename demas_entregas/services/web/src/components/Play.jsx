import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../AuthContext";
import Canvas from './Canvas.jsx'

let position, newBoard, player, id;

const Play = () => {
    const {user} = useContext(AuthContext);
    const [board, setBoard] = useState({})

    const init = () => {
        fetch(`${process.env.CONTROLLER_SERVER_URL}/game`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: '{"player":"abraham.fernandez"}'

        }).then(res => res.json()).then(res => {
            newBoard = res.board
            id = res.id
            player = res.player
            setBoard(res.board)
        })
    }
    const move = (direction) => {
        fetch(`${process.env.CONTROLLER_SERVER_URL}/game/${id}/event`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "player": player,
                "direction": direction
            })
        }).then(res => res.json())
            .then(res => {
                newBoard = res.board
                id = res.id
                player = res.player
                setBoard(res.board)
            })

    }

    useEffect(() => {
        init();
    }, [])


    const render = () => {
        if (board) {
            return (<Canvas board={board}/>)
        } else {
            return (<></>)
        }
    };

    return (
        <>
            <div className="container">
                {render()}
                <button onClick={() => move('left')}>Izquierda</button>
                <button onClick={() => move('down')}>Abajo</button>
                <button onClick={() => move('right')}>Derecha</button>
            </div>
        </>
    )

};

export default Play;
