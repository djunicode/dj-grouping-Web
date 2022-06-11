import { REQUEST_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { SUCCESS_SIGNUP_TOKEN } from "../Constants/signupConstants";
import { FAILURE_SIGNUP_TOKEN } from "../Constants/signupConstants";
import axios from 'axios';

export const signup = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REQUEST_SIGNUP_TOKEN
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(
            "http://omshukla.pythonanywhere.com/accounts/register/",
            { email, password },
            config
        )
            .then((res) => {

                // if (res.data.email) {
                //     console.log(res.data.email);

                //     dispatch({
                //         type: FAILURE_SIGNUP_TOKEN,
                //         payload: res.data.email,
                //     })
                // }
                // else
                 if (res.data.old_token) {
                    console.log(res.data.old_token);

                    dispatch({
                        type: SUCCESS_SIGNUP_TOKEN,
                        payload: res.data.old_token
                    })
                    localStorage.setItem('userToken', JSON.stringify(res.data.old_token))

                }
            })




    }
    catch (error) {
        dispatch({
            type: FAILURE_SIGNUP_TOKEN,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

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
