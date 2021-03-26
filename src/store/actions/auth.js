import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};


export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type:actionTypes.AUTH_FAIL,
    error:error
  };
};

export const auth = (email, password) => {
  return dispatch => {
      dispatch(authStart());
      const authData = {
        email:email,
        password: password,
        returnSecureToken:true
      };
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCITQ-sunTERDCPcvntQwgcvUKlB2nhem4',authData)
        .then(res => {
          console.log(res.data);
          dispatch(authSuccess(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail());
        }
        )
  }
}