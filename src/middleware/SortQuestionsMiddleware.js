import { SETQUESTIONS, SETQUESTION } from '../actions/questions'

const SortQuestionsMiddleware = store => next => action => {
    if (action.type === SETQUESTIONS||action.type === SETQUESTION) {
      if (Array.isArray(action.questions)) {
        action.questions.sort((a, b) => {
          return b.timestamp- a.timestamp;
        });
      }
    }
    return next(action);
  };
  
  export default SortQuestionsMiddleware;
  