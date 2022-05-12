import { REQUEST_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { SUCCESS_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { FAILURE_SIGNUP_TOKEN } from "../Constants/signupConstants";


const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_SIGNUP_TOKEN:
            return {
                loading: true,
            }
        case SUCCESS_SIGNUP_TOKEN:
            return {
                loading: false,
                userToken: action.payload,
            }
        case FAILURE_SIGNUP_TOKEN:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

export default signupReducer