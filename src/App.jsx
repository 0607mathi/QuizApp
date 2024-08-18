import { useEffect, useState } from 'react'
import './index.css'
import questions from "./questins.json"
function App() {
  const [setScoreVisible,setSetScoreVisible]=useState(false)
  const [currentQuestion,setCurrentQuestion]=useState(0)
  const [correctanswercount,setCorrectAnswerCount]=useState(0)
  const [timer,setTimer]=useState(60)
  
  function Valid(option){
      if(option===questions[currentQuestion].answer){
        setCorrectAnswerCount((prevcount)=>prevcount+1)
      }
      if(currentQuestion<questions.length-1){
        setCurrentQuestion((prevquiz)=>prevquiz+1)
        setTimer(60)
      }
      else {
        setSetScoreVisible(true)
      }
  }

  useEffect(()=>{
      let interval;
      if(timer>0 && !setScoreVisible){
        interval = setInterval(()=>{
          setTimer((prevtime)=>prevtime-1)
        },1000)
      }
      else{
        clearInterval(interval)
        if(currentQuestion<questions.length-1){
          setCurrentQuestion((prevquiz)=>prevquiz+1)
          setTimer(60)
        }
        else {
          setSetScoreVisible(true)
        }
      }
      return()=>clearInterval(interval)
  },[timer,setScoreVisible])

  function RetryBtn(){
    setSetScoreVisible(false)
    setCurrentQuestion(0)
    setCorrectAnswerCount(0)
    setTimer(60)
  }

  return (
   <div className='container'>
     <div className='quizApp'>
      {setScoreVisible==false?
        <div className='Quiz'>
           <p className='tittle'>General Knowledge Quiz</p>
          <p>Question No : {currentQuestion+1}</p>
          <p>{questions[currentQuestion].Question}</p>
          <div className='options'>
            {(questions[currentQuestion].options).map((option,index)=>(
              <button key={index} onClick={()=>Valid(option)}>{option}</button>
             ))}
          </div>
          <div className="timer">
            <div>remaing seconds <span>{timer}s</span></div>
          </div>
        </div> :
        <div className='score-card'>
           <p className='tittle'>Result</p>
          <p>Your Score is {correctanswercount}/{questions.length}</p>
          <button onClick={()=>{RetryBtn()}}>Retry &#8634;</button>
        </div>}
    </div>
   </div>
  )
}

export default App
