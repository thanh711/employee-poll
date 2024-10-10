import './CreatePoll.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateQuestion } from '../../actions/questions';

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = useSelector(state => state.user);  
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleCreateQuestion(
        { optionOneText:optionOne, optionTwoText:optionTwo, author:user.id},
        ()=>{navigate('/')}
      ));
  };

  return (
      <div className="container">
          <h1 className="title">Would You Rather</h1>
          <h2 className="subtitle">Create Your Own Poll</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-option">
            <input
                  type="text"
                  placeholder="First Option"
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value)}
                  className="input"
              />
              <input
                  type="text"
                  placeholder="Second Option"
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                  className="input"
              />
            </div>
              <div className="button-container">
                  <button type="submit" className="button">Submit</button>
              </div>
          </form>
      </div>
  );
};

export default CreatePoll;
