import { useState } from 'react'
import './index.css'
import questions from "./questins.json"
function App() {
  const [setScoreVisible,setSetScoreVisible]=useState(false)
  const [currentQuestion,setCurrentQuestion]=useState(0)
  const [correctanswercount,setCorrectAnswerCount]=useState(1)
  
  function Vaild(option){
      if(currentQuestion<=questions.length-1) {
        console.log(currentQuestion)
        setCurrentQuestion((currentQuestion)=>currentQuestion+1)
        console.log("after increment"+currentQuestion)
      }
      else setSetScoreVisible(true)
  }

  function RetryBtn(){
    setSetScoreVisible(false)
    setCurrentQuestion(0)
    setCorrectAnswerCount(1)
  }
  
  return (
   <div className='container'>
     <div className='quizApp'>

      {setScoreVisible==false?
        <div className='Quiz'>
          <p>Question No : {currentQuestion+1}</p>
          <p>{questions[currentQuestion].Question}</p>
          <div className='options'>
            {(questions[currentQuestion].options).map((option,index)=>(
              <button key={index} onClick={()=>Vaild(option)}>{option}</button>
             ))}
          </div>
          <div className="timer">
            <div>remaing seconds <span>10s</span></div>
          </div>
        </div> :
        <div className='score-card'>
          <p>Your Score is {correctanswercount}/{questions.length}</p>
          <button onClick={()=>{RetryBtn()}}>Retry &#8634;</button>
        </div>}
    </div>
   </div>
  )
}

export default App
