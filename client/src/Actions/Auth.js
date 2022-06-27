import { AUTH } from './../Constants/actionTypes';
import * as Api from '../Api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await Api.signIn(formData);

        dispatch({ type: AUTH, data })
        router('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await Api.signUp(formData);

        dispatch({ type: AUTH, data })
        router('/')
    } catch (error) {
        console.log(error) 
    }
}