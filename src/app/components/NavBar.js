import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { userLogout } from '../store/actions/authActions'

class NavBar extends React.Component {

  handleLogout = () => {
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    return(
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid
            justify="space-between"
            container
          >
            <Grid item>
              <img src={'https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e3776e21212670a27c719d8_logo-horizontal.svg'} alt="Reap" />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                onClick={this.props.logout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout())
  }
}

NavBar.propTypes = {
  logout: PropTypes.func,
  history: PropTypes.object,
}

export default connect(null, mapDispatchToProps)(NavBar)