import { SETQUESTIONS,SELECTANSWER,ADDQUESTION } from '../actions/questions'
import { LOGIN, SETUSERS } from '../actions/users'

const initialState = {
    user:{},
    users:[],
    questions:[]
  };
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERS:{
            return { user: state.user, users:action.users, questions:state.questions};
        }
        case LOGIN:{
          return { user: action.user, users:state.users, questions:state.questions};
        }
        case SETQUESTIONS: {
            return {
              ...state,
              questions: [...action.questions] 
            };
        }
        case ADDQUESTION: {
            var updatedUser=state.users.find(x=>x.id===state.user.id );
            updatedUser={
              ...updatedUser,
              questions:[...updatedUser.questions, action.question.id]
            }
            const updatedUsers = state.users.map((x) => state.user.id === x.id ? updatedUser: x);

            return { user: updatedUser, users: updatedUsers, questions: [...state.questions, action.question] };
        }
        case SELECTANSWER:{
            var changeQuestion=state.questions.find(x=>x.id===action.info.qid );
            if(action.info.answer==='optionOne'){
              changeQuestion={
                ...changeQuestion,
                optionOne:{
                  ...changeQuestion.optionOne,
                  votes: [...changeQuestion.optionOne.votes, action.info.authedUser],
                }}
            }
            if(action.info.answer==='optionTwo'){
              changeQuestion={
                ...changeQuestion,
                optionTwo:{
                  ...changeQuestion.optionTwo,
                  votes: [...changeQuestion.optionTwo.votes, action.info.authedUser],
                }}
            }
            const updatedQuestions = state.questions.map((question) => action.info.qid === question.id ? changeQuestion: question);

            var changeUser=state.users.find(x=>x.id===action.info.authedUser );
            changeUser={
              ...changeUser,
              answers:{
                ...changeUser.answers,
                [action.info.qid]:action.info.answer}
            }
            const updatedUsers = state.users.map((user) => action.info.authedUser === user.id ? changeUser: user);
            return { user: changeUser, users: updatedUsers, questions:updatedQuestions};
          }
        default:
          return state;
      }

};

export default rootReducer;