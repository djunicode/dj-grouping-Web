import { REQUEST_LOGIN_TOKEN } from "../Constants/loginConstants";
import { SUCCESS_LOGIN_TOKEN } from "../Constants/loginConstants";
import { FAILURE_LOGIN_TOKEN } from "../Constants/loginConstants";

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_LOGIN_TOKEN:
            return {
                loading: true,
            }
        case SUCCESS_LOGIN_TOKEN:
            return {
                loading: false,
                loginToken: action.payload,
                userNo : action.user
            }
        case FAILURE_LOGIN_TOKEN:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

export default loginReducer;