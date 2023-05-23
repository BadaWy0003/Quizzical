import React from 'react'
import {decode} from "html-entities"

export default function Question(props){


    
    
    
    return(<div className="question-container">
    <h3>{decode(props.question, {level: "html5"})}</h3>
    <div className="choices-container">{props.answers.map(a=><button 
        className={props.checkAnswer?
                    a.isCorrect?
                    "choices-selected-correct":
                    a.isHeld && a.isCorrect===false?
                    "choices-selected-wrong"
                    :"choices-not-selected"
                    :a.isHeld?
                    "choices-selected"
                    :"choices"
                } 
        onClick={()=>props.handleHold(a.id,props.question)} disabled={props.checkAnswer}>{decode(a.value, {level: "html5"})}</button>)}
    </div>
    
    
</div>)
        
   
    
}