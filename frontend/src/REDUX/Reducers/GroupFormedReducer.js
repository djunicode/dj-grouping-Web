import { GROUP_VIEW_FAIL } from "../Constants/groupFormed";
import { GROUP_VIEW_REQUEST } from "../Constants/groupFormed";
import { GROUP_VIEW_SUCCESS } from "../Constants/groupFormed";


const GroupFormedReducer = (state = {}, action) => {

    switch (action.type) {
        case GROUP_VIEW_REQUEST:
            return {
                loading: true,
            }
        case GROUP_VIEW_SUCCESS:
            return {
                loading: false,
                GroupFormedData: action.payload,
            }
        case GROUP_VIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state

    }
}

export default GroupFormedReducer