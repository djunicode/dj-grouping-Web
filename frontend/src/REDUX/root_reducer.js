import { combineReducers } from 'redux';
import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import viewProfileReducer from "./Reducers/viewProfileReducer";

const rootReducer = combineReducers({
    signUp : signupReducer,
    viewProfile : viewProfileReducer,
    userLogin : loginReducer,
})

export default rootReducer;