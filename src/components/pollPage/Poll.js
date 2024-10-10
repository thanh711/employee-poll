import "./Poll.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleSelectAnswer } from '../../actions/questions';

const Poll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { question_id } = useParams(); 
  const user = useSelector(state => state.user);  
  const users = useSelector(state => state.users);  
  const questions = useSelector(state => state.questions);  
  const [question,setQuestion]=useState({});
  const [questionAuthor,setQuestionAuthor]=useState({});
  const [answer,setAnswer]=useState('');
  const [optionOneVote,setOptionOneVote]=useState(0);
  const [optionTwoVote,setOptionTwoVote]=useState(0);


  useEffect(() => {
    const currentQuestion=questions.find(x=>x.id===question_id);
    const currentQuestionAuthor=users.find(x=>x.id===currentQuestion?.author);

    if(!currentQuestion){
      navigate('/not-found'); 
    }
    if(user?.answers&&user.answers[question_id]){
      setAnswer(user.answers[question_id]);
    }
    setQuestionAuthor(currentQuestionAuthor);
    setQuestion(currentQuestion);
    setOptionOneVote(currentQuestion?.optionOne?.votes?.length??0);
    setOptionTwoVote(currentQuestion?.optionTwo?.votes?.length??0);
  }, [questions, navigate, question_id, user, users]);

  const selectAnswer= (option)=>{
    if(answer==='')
    dispatch(handleSelectAnswer(user.id,question.id,option)); 
  }

  
  return (
    <div className="container">
      <div className="profileContainer">
        <img src={questionAuthor.avatarURL} alt="Profile" className="profileImage" />
        <h2 className="pollAuthor">Poll by {questionAuthor.name}</h2>
      </div>
      <h1 className="pollTitle">Would You Rather</h1>
      <div className="buttonContainer">
        <button className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`} 
          disabled={answer==='optionTwo'}
          onClick={() => selectAnswer('optionOne')}>
          {question?.optionOne?.text}
        </button>
        <button className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`} 
          disabled={answer==='optionOne'}
          onClick={() => selectAnswer('optionTwo')}>
          {question?.optionTwo?.text}
        </button>
      </div>
      {answer&&<div className='voteInfoContainer'>
        <div className={`optionButton `}>
          {`${optionOneVote}/${optionOneVote+optionTwoVote} (${(optionOneVote*100/(optionOneVote+optionTwoVote)).toFixed(2)}%)`}
        </div>
        <div className={`optionButton `} >
          {`${optionTwoVote}/${optionOneVote+optionTwoVote} (${(optionTwoVote*100/(optionOneVote+optionTwoVote)).toFixed(2)}%)`}
        </div>
      </div>}
    </div>
  );
};
 
export default Poll;