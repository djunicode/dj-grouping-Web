import axios from "axios";
import { PROFILE_VIEW_REQUEST } from "../Constants/viewProfileConstants";
import { PROFILE_VIEW_SUCCESS } from "../Constants/viewProfileConstants";
import { PROFILE_VIEW_FAIL } from "../Constants/viewProfileConstants";

export const Viewprofile = () => async (dispatch) => {
  const id = localStorage.getItem("userId")
  try {
    dispatch({ type: PROFILE_VIEW_REQUEST });

    const { data } = await axios.get(
      `http://omshukla.pythonanywhere.com/dashboard/userprofile-update/${id}/`
    );
    console.log(data);
    dispatch({
      type: PROFILE_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_VIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
