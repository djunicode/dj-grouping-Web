import { combineReducers } from 'redux';
import signupReducer from "./Signup_redux/signupReducer"


const rootReducer = combineReducers({
    signUp : signupReducer
})

export default rootReducer;