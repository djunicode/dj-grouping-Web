import { REQUEST_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { SUCCESS_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { FAILURE_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";

const createProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_CREATEPROFILE_TOKEN:
            return {
                loading: true,
            }
        case SUCCESS_CREATEPROFILE_TOKEN:
            return {
                loading: false,
                name: action.payload,
                userNo : action.user
            }
        case FAILURE_CREATEPROFILE_TOKEN:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

export default createProfileReducer;