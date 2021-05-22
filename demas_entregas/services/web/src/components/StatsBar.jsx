import React, {useContext, useState} from "react";
const ProgressBar = (props) => {
    const { bgcolor, completed,player,score } = props;

    const containerStyles = {
        padding: '5px',
        height: 20,
        width: '800px',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
        padding: '5px',
        marginTop:'-5px',
        marginLeft:'-5px',
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    const label={
        color:'white'

    }

    return (

        <div style={containerStyles}>

            <div style={fillerStyles}>
                <span style={labelStyles}>{`${player}`}</span>
                <span style={labelStyles}>{`${score}`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;