import * as _DATA from '../_DATA';
export const LOGIN='LOGIN';
export const SETUSERS='SETUSERS';

export function loginByUser(user){
    return {
        type: LOGIN, 
        user:user
    }
}

export function logout(){
    return {
        type: LOGIN, 
        user:{}
    }
}

function setAllUsers(users){
    return {
        type: SETUSERS, 
        users:users
    }
}

export function handleloginByUser(username, password){
    return (dispatch)=>{
        if(!username||!password)
            return false;
        return _DATA._getUsers()
        .then((response)=>{
            const allUser = Object.entries(response).map(([key, value]) => ( value ));
            dispatch(setAllUsers(allUser));
            const currentUser=allUser.find(x=>x.id===username && x.password===password);
            if(currentUser){
                dispatch(loginByUser(currentUser));
                return true;
            }
                return false;
        })
        .catch((error) => {
            alert('There is some error, please try again later !!!');
            console.error(error);
            return false;
        });
    }
}

export function handleGetAllUsers(){
    return (dispatch)=>{
        return _DATA._getUsers()
        .then((response)=>{
            const allUser = Object.entries(response).map(([key, value]) => ( value ));
            dispatch(setAllUsers(allUser));
        })
        .catch((error) => {
            alert('There is some error, please try again later !!!');
            console.error(error);
        });
    }
}