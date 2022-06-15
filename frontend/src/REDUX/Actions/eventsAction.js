import axios from "axios";
import { EVENTS_VIEW_REQUEST } from "../Constants/eventsConstants";
import { EVENTS_VIEW_SUCCESS } from "../Constants/eventsConstants";
import { EVENTS_VIEW_FAIL } from "../Constants/eventsConstants";

export const ViewEvents = () => async (dispatch) => {
  try {
    dispatch({ type: EVENTS_VIEW_REQUEST });

    const { data } = await axios.get(
      "http://omshukla.pythonanywhere.com/dashboard/events/"
    );
    console.log(data);
    dispatch({
      type: EVENTS_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENTS_VIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
