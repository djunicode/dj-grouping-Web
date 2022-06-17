import { REQUEST_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { SUCCESS_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { FAILURE_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import axios from "axios";

export const createprofile = (first_name, last_name, branch, year_of_passing, mobile_no, bio, barcode) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_CREATEPROFILE_TOKEN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const user = localStorage.getItem("user_id");
    console.log({ first_name, last_name, branch, year_of_passing, mobile_no, bio, user, barcode})
    axios
      .post(
        "http://omshukla.pythonanywhere.com/dashboard/userprofile/",
        { first_name, last_name, branch, year_of_passing, mobile_no, bio, user, barcode},
        config
      )
      .then((res) => {
        console.log(res.data);
         if (res.data.id) {
          dispatch({
            type: SUCCESS_CREATEPROFILE_TOKEN,
            payload: res.data.first_name,
            user: res.data.id
          });
          localStorage.setItem("name", JSON.stringify(res.data.first_name));
          localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
        }
      });
  } catch (error) {
    dispatch({
      type: FAILURE_CREATEPROFILE_TOKEN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
