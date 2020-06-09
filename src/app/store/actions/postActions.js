import api from '../../plugins/axiosConfig'
import {
  SET_POSTS,
  FAILED_TO_GET_POSTS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './types'
import { userLogout } from './authActions'

export const getAllPosts = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        '/post/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token
          },
          params: data.params
        }
      )
      if (response.status === 401) {
        dispatch(userLogout())
        return
      }
      dispatch(setPosts(response.data.data))
    } catch (error) {
      dispatch(failedToGetPosts(true))
    }
  }
}

export const submitNewPost = (data, token) => {
  return async (dispatch) => {
    try {
      if (data.file.size <= 2 * 1024 * 1024) {
        const formData = new FormData()
        formData.append('image', data.file)
        formData.append('caption', data.uploadCaption)
        const response = await api.post(
          '/post/',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }
        )
        if (response.status === 401) {
          dispatch(userLogout())
          return
        }
        dispatch(uploadSuccess(true))
      }
      dispatch(uploadFailure(true))
    } catch (error) {
      dispatch(uploadFailure(true))
    }
  }
}

export const setPosts = (data) => ({
  type: SET_POSTS,
  payload: data
})


export const failedToGetPosts = (data) => ({
  type: FAILED_TO_GET_POSTS,
  payload: data
})

export const uploadSuccess = (data) => ({
  type: UPLOAD_SUCCESS,
  payload: data
})

export const uploadFailure = (data) => ({
  type: UPLOAD_FAILURE,
  payload: data
})