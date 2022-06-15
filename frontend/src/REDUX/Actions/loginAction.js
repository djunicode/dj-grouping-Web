import { REQUEST_LOGIN_TOKEN } from "../Constants/loginConstants";
import { SUCCESS_LOGIN_TOKEN } from "../Constants/loginConstants";
import { FAILURE_LOGIN_TOKEN } from "../Constants/loginConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_LOGIN_TOKEN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://omshukla.pythonanywhere.com/accounts/login/",
        { email, password },
        config
      )
      .then((res) => {
         if (res.data.token) {
          console.log(res.data.token);
          dispatch({
            type: SUCCESS_LOGIN_TOKEN,
            payload: res.data.token,
            user: res.data.user_id
          });
          localStorage.setItem("loginToken", JSON.stringify(res.data.token));
          localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
        }
      });
  } catch (error) {
    dispatch({
      type: FAILURE_LOGIN_TOKEN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
