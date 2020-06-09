import api from '../../plugins/axiosConfig'
import {
  SET_USERS,
  FAILED_TO_GET_USERS,
} from './types'
import { userLogout } from './authActions'

export const getAllUsers = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        '/user/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token
          }
        }
      )
      if (response.status === 401) {
        dispatch(userLogout())
        return
      }
      dispatch(setUsers(response.data.data))
    } catch (error) {
      dispatch(failedToGetUsers(true))
    }
  }
}

export const setUsers = (data) => ({
  type: SET_USERS,
  payload: data
})


export const failedToGetUsers = (data) => ({
  type: FAILED_TO_GET_USERS,
  payload: data
})