import { REQUEST_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { SUCCESS_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { FAILURE_SIGNUP_TOKEN } from "../Constants/signupConstants";
import axios from "axios";

export const signup = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SIGNUP_TOKEN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios
      .post(
        "http://omshukla.pythonanywhere.com/accounts/register/",
        { email, password },
        config
      )
      // .then((res) => {
        if (data.email) {
          console.log(data.email);
          dispatch({
            type: FAILURE_SIGNUP_TOKEN,
            payload: data.email,
          });
        } else if (data.old_token) {
          console.log(data.old_token);

          dispatch({
            type: SUCCESS_SIGNUP_TOKEN,
            payload: data.old_token,
          });
          localStorage.setItem("userToken", JSON.stringify(data.old_token));
        }
      // });
  } catch (error) {
    dispatch({
      type: FAILURE_SIGNUP_TOKEN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const requestSignupToken = () => {
//     return {
//         type: REQUEST_SIGNUP_TOKEN
//     }
// }

// export const successSignupToken = (token) => {
//     return {
//         type: SUCCESS_SIGNUP_TOKEN,
//         payload: token,
//     }
// }

// export const failureSignupToken = (error) => {
//     return {
//         type: FAILURE_SIGNUP_TOKEN,
//         payload: error,

//     }
// }
