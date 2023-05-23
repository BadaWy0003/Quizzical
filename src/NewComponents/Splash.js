import React from 'react'

export default function Splash(props){
    return(
        <div className='splash'>
            
            <h1>Quizzical</h1>
            <p>Click the below button to test your knowledge!</p>
            <button className="start-button" onClick={props.startBtn}>Start test</button>
        </div>
    )
}