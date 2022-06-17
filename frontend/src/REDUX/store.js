import { createStore , applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'react-logger'
import rootReducer from "./root_reducer";
import thunk from 'redux-thunk'

const tokenFromStorage = localStorage.getItem('userToken')? JSON.parse(localStorage.getItem('userToken')) : null
const loginTokenStorage = localStorage.getItem('loginToken')? JSON.parse(localStorage.getItem('loginToken')) : null
const idFromStorage = localStorage.getItem('user_id')? (localStorage.getItem('user_id')) : null;
const sapFromStorage = localStorage.getItem('sap')? (localStorage.getItem('sap')) : null;

const initalState ={
    userToken : { userToken : tokenFromStorage},
    loginToken : { loginToken : loginTokenStorage},
    user_id  : idFromStorage ,
    sap : sapFromStorage,
    GroupFormedData : [],
}


const store = createStore(rootReducer ,initalState , composeWithDevTools(applyMiddleware(thunk)))
export default store;