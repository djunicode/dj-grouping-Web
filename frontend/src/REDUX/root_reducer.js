import { combineReducers } from 'redux';
import eventsReducer from './Reducers/eventsReducer';
import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import viewProfileReducer from "./Reducers/viewProfileReducer";

const rootReducer = combineReducers({
    signUp : signupReducer,
    viewProfile : viewProfileReducer,
    userLogin : loginReducer,
    viewEvents : eventsReducer,
})

export default rootReducer;