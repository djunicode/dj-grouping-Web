import { EVENTS_VIEW_REQUEST } from "../Constants/eventsConstants";
import { EVENTS_VIEW_SUCCESS } from "../Constants/eventsConstants";
import { EVENTS_VIEW_FAIL } from "../Constants/eventsConstants";

const initialState = {
    loading : false,
    userEvents : [],
    error : ''
}

const eventsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case EVENTS_VIEW_REQUEST:
            return {
                // ...state,
                loading: true,
            }
        case EVENTS_VIEW_SUCCESS:
            return {
                loading: false,
                userEvents: action.payload,
            }
        case EVENTS_VIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

export default eventsReducer;