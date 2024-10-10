import * as _DATA from '../_DATA';
export const SETQUESTIONS='SETQUESTIONS';
export const ADDQUESTION='ADDQUESTION';
export const SETQUESTION='SETQUESTION';
export const SELECTANSWER='SELECTANSWER';

export function handleSelectAnswer( authedUser, qid, answer){
    return (dispatch)=>{
        return _DATA._saveQuestionAnswer({ authedUser, qid, answer })
        .then((response)=>{
            dispatch(setSelectedAnswer({authedUser, qid, answer}));
        })
        .catch((error) => {
            alert('There is some error, please try again later !!!');
            console.error(error);
            return false;
        });
    }
}
function setSelectedAnswer(info) {
    return {
        type: SELECTANSWER,
        info: info
    };
}
function setAllQuestions(questions) {
    return {
        type: SETQUESTIONS,
        questions: questions
    };
}
function addQuestion(question) {
    return {
        type: ADDQUESTION,
        question: question
    };
}


export function handleGetAllQuestions() {
    return (dispatch) => {
        return _DATA._getQuestions()
            .then((response) => {
                const allQuestions = Object.entries(response).map(([key, value]) => value);
                dispatch(setAllQuestions(allQuestions));
            })
            .catch((error) => {
                alert('There is some error, please try again later !!!');
                console.error(error);
            });
    };
}

export function handleCreateQuestion(question,cb) {
    return (dispatch) => {
        return _DATA._saveQuestion(question)
            .then((response) => {
                dispatch(addQuestion(response));
                cb();
            })
            .catch((error) => {
                alert('There is some error, please try again later !!!');
                console.error(error);
            });
    };
}