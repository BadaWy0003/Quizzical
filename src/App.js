import './App.css';
import React from 'react'
import {nanoid} from "nanoid"
import Question from "./NewComponents/Question"
import Splash from "./NewComponents/Splash"
import blobYellow from './Assets/blobs-yellow.svg'
import blobBlue from './Assets/blobs-blue.svg'
import Confetti from "react-confetti"






export default function App(){
  const [startQuiz , setStartQuiz] = React.useState(false)
  const [testData , setTestData] = React.useState([])
  const [loading , setLoading] = React.useState(false)
  const [checkAnswer,SetCheckAnswer]= React.useState(false)
  const [notChecked,setNotChecked]= React.useState(true)
  const [endGame , setEndGame] = React.useState(false)
  const [points , setPoints] = React.useState(0)
  

//_______________________________________GET TEST DATA FROM API

      function GetTestData() {
        
    React.useEffect(() => {
      startQuiz &&
      setLoading(true);
      async function fetchMyAPI() {
        let response = await fetch("https://opentdb.com/api.php?amount=5")
        response = await response.json()
        setTestData(response.results.map(element=>{
          const {question, incorrect_answers, correct_answer}=element
          const correctAns = {value:correct_answer,id:nanoid(),isHeld:false,isCorrect:true}
          return(
            {...element,
              question:question,
              answers:[...incorrect_answers.map(a=>{return({value:a,id:nanoid(),isHeld:false,isCorrect:false})}),correctAns].sort((a,b) => a.value.localeCompare(b.value))}
          )
        }))
        setTimeout(() => setLoading(false) , 2000);
        }
      fetchMyAPI()
      }, [startQuiz])
    return <div>{JSON.stringify(testData)}</div>
    }
    
    GetTestData()
    

  console.log(testData)
//_______________________________________ START BUTTON

function startBtn(){
  setStartQuiz(true)
}

//_______________________________________ TEST ELEMENTS

  const testElements = testData[0] && (testData.map(({question,answers,correct_answer},index)=>{
    return(
      
        <Question
          key = {index}
          question = {question}
          correctAnswer = {correct_answer}
          handleHold={handleHold}
          answers = {answers}
          checkAnswer={checkAnswer}
          endGame={endGame}
         /> 
        
      
    )
  }));
 

//_______________________________________ CHOICES SELECTION FUNCTION



function handleHold(answerId,quest){
  !checkAnswer &&
  setTestData(prevTestData=>prevTestData.map(test=>{
    return(
      {...test,
        answers: test.answers.map(ans=>({...ans,isHeld:test.question===quest?ans.id===answerId?!ans.isHeld:false:ans.isHeld}))}
    )
  })
)}
//_______________________________________ CHECK ANSWERS FUNCTION

React.useEffect(()=>  
  testData[0] && testData.every( ({answers})=>answers.find(({isHeld})=>isHeld )) ? 
  setEndGame(true): setEndGame(false) 
  ,[testData])

function checkAnswers(){
  endGame &&  notChecked &&
  SetCheckAnswer(true)
  setNotChecked(false)
  testData.map(
    ({answers})=> answers.filter(
        ({isHeld,isCorrect})=>isHeld && isCorrect)[0] && setPoints(prev=>prev+1))
}

//_______________________________________


 return(
  <div className='main'>
    <div className='blob-yellow'><img src={blobYellow}/></div>
    <div className='blob-blue'><img src={blobBlue}/></div>
    {checkAnswer && points===5 && <Confetti />}
    {startQuiz===false? 
      
      <Splash
      startBtn={startBtn}
      />
      :loading?<div className='loading'><h1>Quizzical</h1><h4>Loading your test...</h4></div>:
      
      <div className='test'>
            
           {testElements}
        <div className='buttons-bot'>
        <button className="reset" onClick={()=>{setStartQuiz(false);SetCheckAnswer(false);setPoints(0);setNotChecked(true)}}>Reset</button>
        <button className="check-answers" disabled={!endGame} onClick={()=>notChecked && checkAnswers()}>Check answers</button>
        </div>
      </div>}
      {checkAnswer && <h1>You scored {points}/5</h1>}
  </div>
 )
}



//{testElements} 

/*<div key={nanoid()}>
        <h1>Quizzical</h1>
        <p>Click the below button to test your knowledge!</p>
        <button className="start-button" onClick={startBtn}>Start test</button>
      </div>*/
        