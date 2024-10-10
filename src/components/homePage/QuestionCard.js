import "./QuestionCard.css";
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({username,timestamp, isSelected, questionId}) => {
  const navigate = useNavigate();


  const ShowQuestion= ()=>{
    navigate('/questions/'+questionId); 
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${hours}:${formattedMinutes} ${ampm} | ${month}/${day}/${year}`;
  }
  
  return (
    <div className="question-card">
      <div className="question-header">{username}</div>
      <div className="question-time">{formatTimestamp(timestamp)}</div>
      <button onClick={ShowQuestion} 
      className={!isSelected ? "question-button" : "question-button-red"}>
        {isSelected === undefined ? "Vote" : "View"}</button>
    </div>
  );
};

export default QuestionCard;
