import React from 'react'
import { mount, configure } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import Login from './app/pages/Login'
import Register from './app/pages/Register'
import Home from './app/pages/Home'
import App from './App'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
 
const mockStore = configureStore([])
let store = mockStore({
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
  })

configure({adapter: new Adapter()})

test('Valid path - Login', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/login' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(wrapper.find(Login)).toHaveLength(0)
  expect(wrapper.find(Register)).toHaveLength(1)
})

test('Valid path - Register', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/register' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(wrapper.find(Login)).toHaveLength(1)
  expect(wrapper.find(Register)).toHaveLength(0)
})

test('Valid path - Home', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(wrapper.find(Login)).toHaveLength(1)
  expect(wrapper.find(Home)).toHaveLength(0)
})

test('Valid path - Home logged in', () => {
  const wrapper = mount(
    <Provider store={mockStore({...store, loginSuccess: true})}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(wrapper.find(Login)).toHaveLength(1)
  expect(wrapper.find(Home)).toHaveLength(0)
})