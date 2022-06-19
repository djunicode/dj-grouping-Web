import { REQUEST_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { SUCCESS_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import { FAILURE_CREATEPROFILE_TOKEN } from "../Constants/createProfileConstants";
import axios from "axios";

export const createprofile =
  (first_name, last_name, branch, year_of_passing, mobile_no, bio, barcode) =>
  async (dispatch) => {
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
      console.log({
        first_name,
        last_name,
        branch,
        year_of_passing,
        mobile_no,
        bio,
        user,
        barcode,
      });
      const { data } = await axios.post(
        "http://omshukla.pythonanywhere.com/dashboard/userprofile/",
        {
          first_name,
          last_name,
          branch,
          year_of_passing,
          mobile_no,
          bio,
          user,
          barcode,
        },
        config
      );
      // .then((res) => {
      console.log(data);
      if (data.id) {
        dispatch({
          type: SUCCESS_CREATEPROFILE_TOKEN,
          payload: data.first_name,
          user: data.id,
        });
        localStorage.setItem("name", JSON.stringify(data.first_name));
        localStorage.setItem("user_id", JSON.stringify(data.user_id));
      }
      // });
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
