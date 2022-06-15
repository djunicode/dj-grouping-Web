import { GROUP_VIEW_REQUEST, GROUP_VIEW_SUCCESS, GROUP_VIEW_FAIL } from "../Constants/groupFormed"
import axios from "axios";

export const GroupFormedAction = () => async (dispatch) => {
    try {
        dispatch({
            type: GROUP_VIEW_REQUEST
        })

        axios.get("http://omshukla.pythonanywhere.com​/dashboard​/group​/")
            .then((res) => {
                console.log(res);

                dispatch({
                    type: GROUP_VIEW_SUCCESS,
                    payload: res.data
                })
            })
    }
    catch (error) {
        dispatch({
            type: GROUP_VIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })

    }
}