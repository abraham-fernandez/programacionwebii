import React, {useContext, useState} from "react";
const ProgressBar = (props) => {
    const { bgcolor, completed,estado,score } = props;

    const containerStyles = {
        height: 20,
        width: '800px',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
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
                <span style={labelStyles}>{`${estado}`}</span>
              <span style={labelStyles}>{`${score}`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;