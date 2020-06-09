import api from '../../plugins/axiosConfig'
import {
  SET_USERNAME,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_LOGOUT
} from './types'

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        '/user/',
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        },
        {
          data: {
            'email': data.email,
            'username': data.username,
            'password': data.password
          }
        }
      )
      dispatch(loginSuccess(response.data))
    } catch (error) {
      dispatch(registrationError(true))
    }
  }
}

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        '/auth/login',
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        },
        {
          data: {
            'email': data.email,
            'password': data.password
          }
        }
      )
      dispatch(loginSuccess(response.data))
    } catch (error) {
      dispatch(loginError(true))
    }
  }
}

export const userLogout = () => ({
  type: USER_LOGOUT
})

export const setUsername = (data) => ({
  type: SET_USERNAME,
  payload: data
})

export const registrationError = (bool) => ({
  type: REGISTRATION_ERROR,
  payload: bool
})

export const loginError = (bool) => ({
  type: LOGIN_ERROR,
  payload: bool
})

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
})