import { PROFILE_VIEW_REQUEST } from "../Constants/viewProfileConstants";
import { PROFILE_VIEW_SUCCESS } from "../Constants/viewProfileConstants";
import { PROFILE_VIEW_FAIL } from "../Constants/viewProfileConstants";

const initialState = {
    loading : false,
    userProfile : [],
    error : ''
}

const viewProfileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case PROFILE_VIEW_REQUEST:
            return {
                // ...state,
                loading: true,
            }
        case PROFILE_VIEW_SUCCESS:
            return {
                loading: false,
                userProfile: action.payload,
            }
        case PROFILE_VIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

export default viewProfileReducer;