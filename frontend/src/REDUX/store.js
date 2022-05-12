import { createStore , applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'react-logger'
import rootReducer from "./root_reducer";
import thunk from 'redux-thunk'

const tokenFromStorage = localStorage.getItem('userToken')? JSON.parse(localStorage.getItem('userToken')) : null

const initalState ={
    userToken : { userToken : tokenFromStorage}
}

const store = createStore(rootReducer ,initalState , composeWithDevTools(applyMiddleware(thunk)))
export default store;