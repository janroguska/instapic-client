import {
  SET_USERNAME,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_POSTS,
  FAILED_TO_GET_POSTS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  SET_USERS,
  FAILED_TO_GET_USERS,
  USER_LOGOUT
} from '../actions/types'

const initialState = {
  userToken: '',
  username: '',
  registrationError: false,
  loginSuccess: false,
  loginError: false,
  posts: [],
  gotPosts: false,
  failedToGetPosts: false,
  uploadSuccess: false,
  uploadFailure: false,
  userList: [],
  failedToGetUsers: false
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case USER_LOGOUT:
      return {
        ...initialState,
        posts: [],
        userList: []
      }
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    case REGISTRATION_ERROR:
      return {
        ...state,
        registrationError: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        userToken: action.payload.Authorization
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      }
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        gotPosts: true
      }
    case FAILED_TO_GET_POSTS:
      return {
        ...state,
        failedToGetPosts: action.payload
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploadSuccess: action.payload
      }
    case UPLOAD_FAILURE:
      return {
        ...state,
        uploadFailure: action.payload
      }
    case SET_USERS:
      return {
        ...state,
        userList: action.payload
      }
    case FAILED_TO_GET_USERS:
    return {
      ...state,
      failedToGetUsers: action.payload
    }

    default:
      return state
  }
}

export default rootReducer
