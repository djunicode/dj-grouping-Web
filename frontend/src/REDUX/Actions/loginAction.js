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

    const { data } = await axios.post(
      "http://omshukla.pythonanywhere.com/accounts/login/",
      { email, password },
      config
    );

    console.log(data.token);
    dispatch({
      type: SUCCESS_LOGIN_TOKEN,
      payload: data.token,
      user: data.user_id,
    });
    localStorage.setItem("loginToken", JSON.stringify(data.token));
    localStorage.setItem("user_id", JSON.stringify(data.user_id));
    
  } catch (error) {
    // console.log("fef");
    dispatch({
      type: FAILURE_LOGIN_TOKEN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
