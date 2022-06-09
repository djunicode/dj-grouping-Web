import { combineReducers } from 'redux';
import signupReducer from './Reducers/signupReducer';
import viewProfileReducer from "./Reducers/viewProfileReducer";

const rootReducer = combineReducers({
    signUp : signupReducer,
    viewProfile : viewProfileReducer,
})

export default rootReducer;