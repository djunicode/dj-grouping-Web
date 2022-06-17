import { combineReducers } from 'redux';
import eventsReducer from './Reducers/eventsReducer';
import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import GroupFormedReducer from './Reducers/GroupFormedReducer';
import viewProfileReducer from "./Reducers/viewProfileReducer";
import createProfileReducer from "./Reducers/createProfileReducer";

const rootReducer = combineReducers({
    signUp : signupReducer,
    viewProfile : viewProfileReducer,
    userLogin : loginReducer,
    GroupFormed : GroupFormedReducer,
    viewEvents : eventsReducer,
    createProfile: createProfileReducer
})

export default rootReducer;