import { AUTH } from '../Constants/actionTypes';
import * as Api from '../Api/index.js';

export const signin = (form, router) => async (dispatch) => {
  try {
    const { data } = await Api.signIn(form);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, router) => async (dispatch) => {
  try {
    const { data } = await Api.signUp(form);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};