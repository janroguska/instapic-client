import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import validator from 'validator'
import { loginUser, loginError } from '../store/actions/authActions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        email: '',
        password: ''
      },
      validators: {
        email: null,
        password: null
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount = () => {
    if (this.props.loginSuccess) this.props.history.push('/')
  }

  componentDidUpdate = () => {
    if (this.props.loginSuccess) this.props.history.push('/')
  }

  handleChange = (name) => (event) => {
    const { profile, validators } = this.state
    const updatedProfile = {
      ...profile,
      [name]: event.target.value
    }
    const updatedValidators = {
      ...validators,
      [name]: name === 'email'
        ? !validator.isEmail(event.target.value)
        : event.target.value.length < 6
    }
    this.setState({
      profile: updatedProfile,
      validators: updatedValidators
    })
  }

  validForm = () => {
  return !(this.state.validators.email === false
    && this.state.validators.password === false)
  }

  submitForm = () => {
    this.props.login(this.state.profile)
  }

  closeSnackbar = () => {
    this.props.updateLoginError(false)
  }

  render() {
    const disabled = this.validForm()
    return (
      <>
        <Snackbar
          open={this.props.loginError}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          message="Please ensure your email and password is correct."
        />
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3} style={{ marginBottom: 20 }}>
            <img src={'https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e3776e21212670a27c719d8_logo-horizontal.svg'} alt="Reap" />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="email"
              error={this.state.validators.email || false}
              value={this.state.profile.email}
              onChange={this.handleChange('email')}
              required
              fullWidth
              label="Email Address"
              autoFocus
              variant="outlined"
            />
            <TextField
              type="password"
              error={this.state.validators.password || false}
              value={this.state.profile.password}
              onChange={this.handleChange('password')}
              required
              fullWidth
              label="Password"
              autoFocus
              variant="outlined"
            />
            <Button
              disabled={disabled}
              onClick={this.submitForm}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userToken: state.userToken,
    loginError: state.loginError,
    loginSuccess: state.loginSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(loginUser(data)),
    updateLoginError: (data) => dispatch(loginError(data))
  }
}

Login.propTypes = {
  loginSuccess: PropTypes.bool,
  history: PropTypes.object,
  login: PropTypes.func,
  updateLoginError: PropTypes.func,
  loginError: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
