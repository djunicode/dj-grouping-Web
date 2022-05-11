import { combineReducers } from 'redux';
import signupReducer from './Reducers/signupReducer';

const rootReducer = combineReducers({
    signUp : signupReducer
})

export default rootReducer;