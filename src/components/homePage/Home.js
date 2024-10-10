import "./Home.css";
import React, { useEffect, useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionCard  from './QuestionCard';
import {handleGetAllQuestions} from '../../actions/questions';

const Home = () => {
  const dispatch = useDispatch(); 
  const user = useSelector(state => state.user);  
  const questions = useSelector(state => state.questions);  
  const [unfinishedQuestions, setUnifishedQuestions] = useState(true);
  const [finishedQuestions, setFinishedQuestions] = useState(false);

  useEffect(() => {
    dispatch(handleGetAllQuestions());
  }, [dispatch]);
  
  return (
    <div className="App">

<div className="toggle-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={unfinishedQuestions}
            onChange={()=>{setUnifishedQuestions(!unfinishedQuestions)}}
          />
          <span className="slider"></span>
        </label>
        <label className="toggle-label">Unanswered polls</label>
      </div>
      <div className="toggle-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={finishedQuestions}
              onChange={()=>{setFinishedQuestions(!finishedQuestions)}}
          />
          <span className="slider"></span>
        </label>
        <label className="toggle-label">Answered polls</label>
      </div>

      
      <div className="section">
        <h2>New Questions</h2>
        
        {questions && questions.length>0&&unfinishedQuestions&&(
          <div className="card-container">
            {questions
          .filter(x=>!x.optionOne.votes.includes(user.id) && !x.optionTwo.votes.includes(user.id))
          .map(x=>
            <QuestionCard 
              username={x.author} 
              timestamp={x.timestamp} 
              questionId={x.id}
              key={x.id} />
          )}</div>
        )}
        
      </div>
      <div className="section">
        <h2>Done</h2>
       
        {questions && questions.length>0&&finishedQuestions&&( 
          <div className="card-container">
            {questions
          .filter(x=>x.optionOne.votes.includes(user.id) || x.optionTwo.votes.includes(user.id))
          .map(x=>
            <QuestionCard 
            username={x.author} 
            timestamp={x.timestamp} 
            questionId={x.id}
            isSelected={true} 
            key={x.id} />
          )}</div>
          )}
      </div>
    </div>
  );
};

export default Home;