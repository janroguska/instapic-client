import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './app/pages/Login'
import Register from './app/pages/Register'
import Home from './app/pages/Home'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
